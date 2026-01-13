import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../contexts/TodoContext";

const TodoList = () => {
    const {todoState} = useContext(TodoContext);

    if(todoState.loading) {
        return <p>Loading...</p>
    }

    if(todoState.error) {
        return <p className="text-red">Error: todosState.error</p>
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