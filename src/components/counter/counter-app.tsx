import { createElement } from "@/jsx-runtime";
import Counter from "./counter";

const CounterApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <h1 className="w-full text-3xl font-bold text-gray-800 mb-8">
        Simple Counter Component
      </h1>
      <div className="flex gap-6">
        <div>
          <h2 className="text-lg text-gray-600 mb-4">
            Counter with default initial value (0):
          </h2>
          <Counter />
        </div>

        <div>
          <h2 className="text-lg text-gray-600 mb-4">
            Counter with initial value of 10:
          </h2>
          <Counter initialCount={10} />
        </div>

        <div>
          <h2 className="text-lg text-gray-600 mb-4">
            Counter with initial value of -5:
          </h2>
          <Counter initialCount={-5} />
        </div>
      </div>
    </div>
  );
};

export default CounterApp;
