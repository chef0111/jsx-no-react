/* @jsx createElement */
import { createElement, useState } from '../jsx-runtime';
import { setRouterContext } from './router-context';

interface RouterProps {
  children: any;
}

const Router = ({ children }: RouterProps) => {
  const initialPath = window.location.pathname || '/';
  const [currentPath, setCurrentPath] = useState(initialPath);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Set up router context for child components
  setRouterContext({
    currentPath,
    navigate,
  });

  // Handle browser back/forward buttons
  const handlePopState = () => {
    setCurrentPath(window.location.pathname);
  };

  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', handlePopState);
    window.addEventListener('popstate', handlePopState);
  }

  return <div>{children}</div>;
};

export default Router;
