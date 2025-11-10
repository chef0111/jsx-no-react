/* @jsx createElement */
import { createElement } from '../../jsx-runtime';

interface FormProps {
  onSubmit: (e: Event) => void;
  children?: any;
  className?: string;
}

const Form = ({ onSubmit, children, className }: FormProps) => {
  // Handle form submission and prevent default
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(e);
  };

  const baseClasses = 'space-y-4';
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <form onSubmit={handleSubmit} className={classes}>
      {children}
    </form>
  );
};

export default Form;
