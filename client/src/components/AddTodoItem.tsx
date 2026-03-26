// import { useContext} from "react";
// import { TodoContext } from "../contexts/TodoContext";
import type { Todo } from "../types/Todo";
import { useDispatch } from "react-redux";
import {type AppDispatch } from "../store/todoStore";
import { addPendingTodoItem } from "../contexts/todoSlice";

const AddTodoItem = () => {
    //const {addPendingTodoItem} = useContext(TodoContext);
    const dispatch = useDispatch<AppDispatch>();


    const handleAddClick = () => {
        const pendingTodo: Todo = {
            _id: "-1",
            title: "",
            completed: false,
            createdAt: Date.now(),
            isNew: true,
        } 

        dispatch(addPendingTodoItem(pendingTodo));
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