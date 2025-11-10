/* @jsx createElement */
import { createElement } from './jsx-runtime';
import { Router, Route } from './router';
import Navigation from './components/navbar';
import Home from './modules';
import TodoApp from './components/todo/todo-app';
import { CounterApp } from './components/counter';

const App = () => {  
  return (
    <Router>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/counter" component={CounterApp} />
      <Route path="/todo" component={TodoApp} />
    </Router>
  );
};

export default App;
