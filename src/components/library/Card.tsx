/* @jsx createElement */
import { createElement } from '../../jsx-runtime';

interface CardProps {
  title?: string;
  children?: any;
  className?: string;
  onClick?: () => void;
}

const Card = ({ title, children, className, onClick }: CardProps) => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent/5';
  const classes = className ? `${baseClasses} ${className}` : baseClasses;
  
  return (
    <div className={classes} onClick={onClick}>
      {title ? (
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-2xl font-semibold tracking-tight">
            {title}
          </h3>
        </div>
      ) : null}
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
};

export default Card;
