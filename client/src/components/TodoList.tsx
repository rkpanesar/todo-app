// import { useContext } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import type { RootState } from "../store/todoStore";
// import { TodoContext } from "../contexts/TodoContext";

const TodoList = () => {
   // const {todoState, filteredAndSortedTodos} = useContext(TodoContext);
   const todoState = useSelector((state: RootState) => state.todo);

    if(todoState.loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {todoState.todos.map(t => (
                <TodoItem key={t._id} todo={t}/>
            ))}
        </div>
    )
}

export default TodoList;