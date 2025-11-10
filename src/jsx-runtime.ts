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

  // Only process props if they exist and are not null
  if (vnode.props && typeof vnode.props === 'object') {
    Object.entries(vnode.props).forEach(([key, value]) => {
      if (key === 'className') {
        element.setAttribute('class', value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.entries(value).forEach(([styleKey, styleValue]) => {
          (element.style as any)[styleKey] = styleValue;
        });
      } else if (key.startsWith('on')) {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (typeof value === 'boolean') {
        if (value) {
          element.setAttribute(key, '');
        }
      } else if (value != null) {
        // Handle regular attributes
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
    // Store the active element and its selection
    const activeElement = document.activeElement as HTMLInputElement;
    const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
    const selectionStart = isInput ? activeElement.selectionStart : null;
    const selectionEnd = isInput ? activeElement.selectionEnd : null;
    const activeValue = isInput ? activeElement.value : null;
    
    // Reset state index before re-rendering
    stateIndex = 0;
    
    currentContainer.innerHTML = '';
    const domNode = renderToDOM(currentComponent);
    currentContainer.appendChild(domNode);
    
    // Restore focus and selection
    if (isInput && activeValue !== null) {
      const inputs = currentContainer.querySelectorAll('input, textarea');
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i] as HTMLInputElement;
        if (input.value === activeValue) {
          input.focus();
          if (selectionStart !== null && selectionEnd !== null) {
            input.setSelectionRange(selectionStart, selectionEnd);
          }
          break;
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
