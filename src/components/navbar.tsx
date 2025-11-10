import { createElement } from "@/jsx-runtime";
import Link from "@/router/Link";

const Navigation = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Chef0111
          </Link>
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              activeClassName="bg-accent text-accent-foreground"
            >
              Home
            </Link>
            <Link
              to="/counter"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              activeClassName="bg-accent text-accent-foreground"
            >
              Counter
            </Link>
            <Link
              to="/todo"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              activeClassName="bg-accent text-accent-foreground"
            >
              Todo
            </Link>
            <Link
              to="/library"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              activeClassName="bg-accent text-accent-foreground"
            >
              Library
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;