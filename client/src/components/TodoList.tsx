import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../contexts/TodoContext";

const TodoList = () => {
    const {todoState, filteredAndSortedTodos} = useContext(TodoContext);

    if(todoState.loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {filteredAndSortedTodos.map(t => (
                <TodoItem key={t._id} todo={t}/>
            ))}
        </div>
    )
}

export default TodoList;