import { useContext} from "react";
import { TodoContext } from "../contexts/TodoContext";
import type { Todo } from "../types/Todo";

const AddTodoItem = () => {
    const {addPendingTodoItem} = useContext(TodoContext);


    const handleAddClick = () => {
        const pendingTodo: Todo = {
            _id: "-1",
            title: "",
            completed: false,
            createdAt: new Date(),
            isNew: true,
        } 

        addPendingTodoItem(pendingTodo);
    }

    return (
        <>
            <button onClick={handleAddClick} className="block mb-3 p-2 border rounded bg-[#145882]">
                Add To-Do
            </button>
        </>
    )
}

export default AddTodoItem;