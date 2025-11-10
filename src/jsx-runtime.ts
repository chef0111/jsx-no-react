interface VNode {
  type: string | Function;
  props: Record<string, any>;
  children: (VNode | string | number)[];
}

interface ComponentProps {
  children?: (VNode | string | number)[];
  [key: string]: any;
}

type ComponentFunction = (props: ComponentProps) => VNode;

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: (VNode | string | number | boolean | null | undefined)[]
): VNode {
  const normalizedProps = props || {};

  const flattenedChildren = children
    .flat(Infinity)
    .filter((child) => child != null && child !== false && child !== true);

  return {
    type,
    props: normalizedProps,
    children: flattenedChildren as (VNode | string | number)[],
  };
}

export function Fragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement('fragment', props, ...children);
}

export function renderToDOM(vnode: VNode | string | number | null | undefined): Node {
  // Handle null, undefined, false, true - return empty text node
  if (vnode == null || typeof vnode === 'boolean') {
    return document.createTextNode('');
  }
  
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  if (vnode.type === 'fragment') {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach((child) => {
      const childNode = renderToDOM(child);
      if (childNode) {
        fragment.appendChild(childNode);
      }
    });
    return fragment;
  }

  if (typeof vnode.type === 'function') {
    const componentProps = { ...vnode.props, children: vnode.children };
    const result = vnode.type(componentProps);
    return renderToDOM(result);
  }

  const element = document.createElement(vnode.type as string);

  if (vnode.props && typeof vnode.props === 'object') {
    Object.entries(vnode.props).forEach(([key, value]) => {
      // Feature 1: Refs Support
      if (key === 'ref' && typeof value === 'function') {
        value(element);
        return;
      }

      if (key === 'className') {
        element.setAttribute('class', value);
        return;
      }

      if (key === 'style') {
        // Feature 2: Enhanced Style Handling
        if (typeof value === 'string') {
          element.setAttribute('style', value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([styleKey, styleValue]) => {
            (element.style as any)[styleKey] = styleValue;
          });
        }
        return;
      }

      // Special handling for form/value props to keep input behavior predictable
      if (key === 'value') {
        if ((element as HTMLInputElement).value !== undefined) {
          try {
            (element as HTMLInputElement).value = value as any;
          } catch (err) {
            element.setAttribute('value', String(value));
          }
        } else {
          element.setAttribute('value', String(value));
        }
        return;
      }

      if (key === 'checked') {
        if ((element as HTMLInputElement).checked !== undefined) {
          (element as HTMLInputElement).checked = Boolean(value);
        } else if (value) {
          element.setAttribute('checked', '');
        }
        return;
      }

      if (key.startsWith('on')) {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
        return;
      }

      if (typeof value === 'boolean') {
        if (value) {
          element.setAttribute(key, '');
        }
        return;
      }

      if (value != null) {
        element.setAttribute(key, String(value));
      }
    });
  }

  vnode.children.forEach((child) => {
    element.appendChild(renderToDOM(child));
  });

  return element;
}

// useState implementation - prerequisites
let currentComponent: VNode | null = null;
let currentContainer: HTMLElement | null = null;
let stateIndex = 0;
let stateValues: any[] = [];

export function mount(vnode: VNode, container: HTMLElement): void {
  currentComponent = vnode;
  currentContainer = container;
  
  // Reset state index before rendering
  stateIndex = 0;
  
  // Clear previous content and render new
  container.innerHTML = '';
  const domNode = renderToDOM(vnode);
  container.appendChild(domNode);
}

// Trigger re-render
function rerender() {
  if (currentComponent && currentContainer) {
    // Store the active element and its selection index among inputs
    const activeElement = document.activeElement as HTMLElement | null;
    const isInput = !!(activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA'));
    let inputIndex: number | null = null;
    let selectionStart: number | null = null;
    let selectionEnd: number | null = null;

    if (isInput && currentContainer) {
      const inputsBefore = currentContainer.querySelectorAll('input, textarea');
      inputIndex = Array.prototype.indexOf.call(inputsBefore, activeElement as Node);
      selectionStart = (activeElement as HTMLInputElement).selectionStart;
      selectionEnd = (activeElement as HTMLInputElement).selectionEnd;
    }

    // Reset state index before re-rendering
    stateIndex = 0;

    currentContainer.innerHTML = '';
    const domNode = renderToDOM(currentComponent);
    currentContainer.appendChild(domNode);

    // Restore focus and selection by index (safer than matching by value)
    if (isInput && inputIndex !== null && inputIndex >= 0) {
      const inputsAfter = currentContainer.querySelectorAll('input, textarea');
      if (inputIndex < inputsAfter.length) {
        const input = inputsAfter[inputIndex] as HTMLInputElement;
        input.focus();
        if (selectionStart !== null && selectionEnd !== null) {
          try {
            input.setSelectionRange(selectionStart, selectionEnd);
          } catch (err) {
            // ignore if setSelectionRange isn't supported
          }
        }
      }
    }
  }
}

export function useState<T>(initialValue: T): [T, (newValue: T | ((prev: T) => T)) => void] {
  const currentIndex = stateIndex;
  stateIndex++;
  
  if (currentIndex >= stateValues.length) {
    stateValues.push(initialValue);
  }
  
  const value = stateValues[currentIndex] as T;
  
  const setValue = (newValue: T | ((prev: T) => T)) => {
    const nextValue = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(stateValues[currentIndex])
      : newValue;
    
    stateValues[currentIndex] = nextValue;
    rerender();
  };
  
  return [value, setValue];
}

export type { VNode, ComponentProps, ComponentFunction };
