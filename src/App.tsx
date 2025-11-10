/* @jsx createElement */
import { createElement } from './jsx-runtime';
import { Router, Route } from './router';
import Navigation from './components/navbar';
import Home from './modules';
import TodoApp from './components/todo/todo-app';
import { CounterApp } from './components/counter';
import ComponentLibraryDemo from './components/library/LibraryDemo';

const App = () => {  
  return (
    <Router>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/counter" component={CounterApp} />
      <Route path="/todo" component={TodoApp} />
      <Route path="/library" component={ComponentLibraryDemo} />
    </Router>
  );
};

export default App;
