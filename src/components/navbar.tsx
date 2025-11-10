import { createElement } from "@/jsx-runtime";
import Link from "@/router/Link";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-blue-400 transition-colors"
          >
            Chef0111
          </Link>
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              activeClassName="bg-blue-600 text-white hover:bg-blue-700"
            >
              Home
            </Link>
            <Link
              to="/counter"
              className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              activeClassName="bg-blue-600 text-white hover:bg-blue-700"
            >
              Counter
            </Link>
            <Link
              to="/todo"
              className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              activeClassName="bg-blue-600 text-white hover:bg-blue-700"
            >
              Todo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;