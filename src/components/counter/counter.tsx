import { createElement, useState } from '@/jsx-runtime';
import Button from '@/components/button';

interface CounterProps {
  initialCount?: number;
}

// TODO: Create Counter component
const Counter = ({ initialCount }: CounterProps) => {
  const [count, setCount] = useState(initialCount || 0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(initialCount || 0);
  };

  return (
    <div className="counter bg-white p-5 rounded-lg shadow-lg max-w-md">
      <h2 className="m-0 mb-5 text-blue-600 text-2xl">Count: {count}</h2>
      <div className="buttons flex gap-2.5">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

export default Counter;
