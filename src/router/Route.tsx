/* @jsx createElement */
import { createElement } from '../jsx-runtime';
import { getRouterContext } from './router-context';

interface RouteProps {
  path: string;
  component: any;
}

const Route = ({ path, component: Component }: RouteProps) => {
  const context = getRouterContext();
  
  if (!context) {
    console.error('Route must be used within a Router');
    return null;
  }

  const { currentPath } = context;
  
  // Check if current path matches this route
  const isMatch = currentPath === path;
  
  if (!isMatch) {
    return null;
  }

  // Render the component
  if (typeof Component === 'function') {
    return <Component />;
  }
  
  return Component;
};

export default Route;
