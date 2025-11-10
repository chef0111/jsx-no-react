/* @jsx createElement */
import { createElement } from '../../jsx-runtime';

interface InputProps {
  type?: string;
  value?: string;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  onInput,
  placeholder, 
  className,
  required,
  disabled 
}: InputProps) => {
  // Create a styled input with proper event handling
  const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const classes = className 
    ? `${baseClasses} ${className}` 
    : baseClasses;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onInput={onInput}
      placeholder={placeholder}
      className={classes}
      required={required}
      disabled={disabled}
    />
  );
};

export default Input;
