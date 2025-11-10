import { createElement } from '@/jsx-runtime';

interface ButtonProps {
  onClick?: () => void;
  children?: any;
  className?: string;
}
const Button = (props: ButtonProps) => {
  const baseClasses = "flex-1 px-6 py-3 text-lg font-bold border-2 border-blue-600 bg-blue-600 text-white rounded-lg cursor-pointer transition-all hover:bg-blue-700 hover:border-blue-700 hover:-translate-y-0.5 active:translate-y-0";
  const classes = props.className ? `${baseClasses} ${props.className}` : baseClasses;
  
  return (
    <button 
      onClick={props.onClick} 
      className={classes}
    >
      {props.children}
    </button>
  );
};

export default Button;