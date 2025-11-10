/* @jsx createElement */
import { createElement } from '../jsx-runtime';
import { getRouterContext } from './router-context';

interface LinkProps {
  to: string;
  children: any;
  className?: string;
  activeClassName?: string;
}

const Link = ({ to, children, className, activeClassName }: LinkProps) => {
  const context = getRouterContext();
  
  if (!context) {
    console.error('Link must be used within a Router');
    return null;
  }

  const { currentPath, navigate } = context;
  const isActive = currentPath === to;
  
  const handleClick = (e: Event) => {
    e.preventDefault();
    navigate(to);
  };

  const finalClassName = isActive && activeClassName 
    ? `${className || ''} ${activeClassName}`.trim()
    : className || '';

  return (
    <a 
      href={to} 
      onClick={handleClick}
      className={finalClassName}
    >
      {children}
    </a>
  );
};

export default Link;
