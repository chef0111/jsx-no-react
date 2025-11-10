import { createElement, useState } from '@/jsx-runtime';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={inputValue}
        onInput={(e: any) => setInputValue((e.target as HTMLInputElement).value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;