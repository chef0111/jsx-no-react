/* @jsx createElement */
import TodoList from './todo-list';
import { createElement, useState } from '../../jsx-runtime';
import AddTodoForm from '@/components/todo/add-todo-form';

// TODO: Implement main TodoApp component
const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600 text-lg">Keep track of your tasks</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AddTodoForm onAdd={addTodo} />

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white' : 'px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700'}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white' : 'px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700'}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white' : 'px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700'}
            >
              Completed ({completedCount})
            </button>
          </div>

          <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

          {totalCount > 0 ? (
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Total: <strong className="text-gray-800">{totalCount}</strong></span>
                <span>Active: <strong className="text-blue-600">{activeCount}</strong></span>
                <span>Completed: <strong className="text-green-600">{completedCount}</strong></span>
              </div>
              {completedCount > 0 ? (
                <div className="mt-3 text-center">
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg inline-block font-medium">
                    {Math.round((completedCount / totalCount) * 100)}% Complete!
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
