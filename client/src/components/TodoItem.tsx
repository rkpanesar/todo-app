import type React from "react"
import type { Todo } from "../types/Todo"
import { useContext, useState } from "react"
import { TodoContext } from "../contexts/TodoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons"

type Props = {
    todo: Todo
}

const TodoItem:React.FC<Props> = ({
    todo
}) => {

    const [isInEditMode, setIsInEditMode] = useState(todo._id === "-1" ? true : false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const {addTodo, editTodo, deleteTodoItem, toggleTodo} = useContext(TodoContext);


    const saveUpdates = (id: string) => {
        if(todo._id === "-1") addTodo(updatedTitle);
        
        else {
            if(updatedTitle !== todo.title) {    
                editTodo(id, updatedTitle);
            }
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
                                className={todo.completed ? "line-through text-2xl" : "text-2xl"}
                                onClick={() => setIsInEditMode(true)}
                            >{updatedTitle}</span>
                        )
                    }
                </div>
                <div className="flex justify-around">
                    {
                        isInEditMode && (
                            <button 
                                className="text-white p-2 m-1 rounded bg-green-500"
                                onClick={() => saveUpdates(todo._id)}
                            >
                                <FontAwesomeIcon icon={faSave}/>
                            </button>       
                        )
                    }
                    {
                        !isInEditMode && (
                            <button 
                                className="text-white p-2 m-1 rounded bg-green-500"
                                onClick={() => setIsInEditMode(!isInEditMode)}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        )
                    }

                    <button className="text-white p-2 m-1 rounded bg-red-500"
                        onClick={() => deleteTodoItem(todo._id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </div>
       
    )
}

export default TodoItem;