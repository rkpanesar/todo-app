import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const AddTodoItem = () => {
    const [title, setTitle] = useState('');
    const {addTodo} = useContext(TodoContext);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(!title.trim()) return;
        addTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                className="border p-2 rounded w-full"
                placeholder="Type here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Add
            </button>
        </form>
    )
}

export default AddTodoItem;