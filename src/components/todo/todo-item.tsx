import { createElement } from '@/jsx-runtime';
import { Button } from '../library';

interface TodoItemProps {
  key: number | string;
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded cursor-pointer"
      />
      <span 
        className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
      >
        {todo.text}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;