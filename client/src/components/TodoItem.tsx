import type React from "react"
import type { Todo } from "../types/Todo"
import { useContext, useState } from "react"
import { TodoContext } from "../contexts/TodoContext"

type Props = {
    todo: Todo
}

const TodoItem:React.FC<Props> = ({
    todo
}) => {

    const [isInEditMode, setIsInEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const {editTodo, deleteTodoItem, toggleTodo} = useContext(TodoContext);

    const saveUpdates = (id: string) => {
        if(updatedTitle !== todo.title) {    
            editTodo(id, updatedTitle);   
        }

        setIsInEditMode(!isInEditMode);
    }

    return (
      
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded mb-2">
                <div className="flex gap-2 items-center">
                    <input 
                        type="checkbox" 
                        checked={todo.completed} 
                        onChange={(e) => {toggleTodo(todo._id, e.target.checked)}}
                    />
                    {isInEditMode && (
                        <input
                            className="border p-2 rounded w-full"
                            type="text"
                            autoFocus
                            value={updatedTitle}
                            onBlur={() => saveUpdates(todo._id)}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    )}
                    {
                        !isInEditMode && (
                            <span 
                                className={todo.completed ? "line-through text-3xl" : "text-3xl"}
                                onClick={() => setIsInEditMode(true)}
                            >{updatedTitle}</span>
                        )
                    }
                </div>
                <div className="flex justify-around">
                    {
                        isInEditMode && (
                            <button 
                                className="text-white p-2 m-1 rounded bg-green-600"
                                onClick={() => saveUpdates(todo._id)}
                            >
                            Save
                            </button>       
                        )
                    }
                    {
                        !isInEditMode && (
                            <button 
                                className="text-white p-2 m-1 rounded bg-green-600"
                                onClick={() => setIsInEditMode(!isInEditMode)}
                            >
                            Edit
                            </button>
                        )
                    }

                    <button className="text-white p-2 m-1 rounded bg-red-600"
                        onClick={() => deleteTodoItem(todo._id)}>Delete
                    </button>
                </div>
            </div>
       
    )
}

export default TodoItem;