import { createElement } from '@/jsx-runtime';
import { Link } from '@/router';

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-12 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-6">
          Welcome!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a demo application showcasing a custom JSX runtime
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Counter App</h2>
            <p className="text-gray-700 mb-4">A simple counter with increment, decrement, and reset functionality</p>
            <Link
              to="/counter" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
            >
              Go to Counter App →
            </Link>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Todo App</h2>
            <p className="text-gray-700 mb-4">A full-featured todo list with add, toggle, delete, and filtering</p>
            <Link
              to="/todo" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              Go to Todo App →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;