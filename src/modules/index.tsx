import { createElement } from '@/jsx-runtime';
import { Link } from '@/router';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome!
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            This is a demo application showcasing a custom JSX runtime with shadcn-style design
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Counter App</h2>
              <p className="text-sm text-muted-foreground mt-2">
                A simple counter with increment, decrement, and reset functionality
              </p>
            </div>
            <Link
              to="/counter" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Go to Counter App →
            </Link>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Todo App</h2>
              <p className="text-sm text-muted-foreground mt-2">
                A full-featured todo list with add, toggle, delete, and filtering
              </p>
            </div>
            <Link
              to="/todo" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Go to Todo App →
            </Link>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 md:col-span-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Component Library</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Reusable components with TypeScript interfaces and shadcn-style design tokens
              </p>
            </div>
            <Link
              to="/library" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            >
              Explore Components →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;