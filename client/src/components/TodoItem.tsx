import type React from "react"
import type { Todo } from "../types/Todo"
import { useContext, useState } from "react"
import { TodoContext } from "../contexts/TodoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, faSave, faXmark } from "@fortawesome/free-solid-svg-icons"

type Props = {
    todo: Todo
}

const TodoItem:React.FC<Props> = ({
    todo
}) => {

    const [isInEditMode, setIsInEditMode] = useState(todo._id.includes("temp") ? true : false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const {getTodo, addTodo, editTodo, deleteTodoItem, toggleTodo} = useContext(TodoContext);


    const saveUpdates = (id: string) => {
        if(todo.isNew) addTodo(updatedTitle, id);
        
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
                        id={"checkbox-completed-"+todo._id}
                        name={"checkbox-completed-"+todo._id}
                        type="checkbox" 
                        checked={todo.completed} 
                        onChange={(e) => {toggleTodo(todo._id, e.target.checked)}}
                    />
                    {isInEditMode && (
                        <input
                            id={"inputText-addTodo-" + todo._id}
                            name={"inputText-addTodo-" + todo._id}
                            className="border p-2 rounded w-full"
                            type="text"
                            autoFocus
                            value={updatedTitle}
                            onKeyDown={(e) => {if (e.key === 'Enter') saveUpdates(todo._id)}}
                            // onBlur={() => saveUpdates(todo._id)}
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
                            <>
                                <button 
                                    className="text-white p-2 m-1 rounded bg-[#1b502b]"
                                    onClick={() => saveUpdates(todo._id)}
                                >
                                    <FontAwesomeIcon icon={faSave}/>
                                </button>
                                <button className="text-white p-2 m-1 rounded bg-[#883333]"
                                    onClick={() => getTodo()}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </>       
                        )
                    }
                    {
                        !isInEditMode && (
                            <>
                                <button 
                                    className="text-white p-2 m-1 rounded bg-[#1b502b]"
                                    onClick={() => setIsInEditMode(!isInEditMode)}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                                <button className="text-white p-2 m-1 rounded bg-[#883333]"
                                    onClick={() => deleteTodoItem(todo._id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </>
                        )
                    }

                </div>
            </div>
       
    )
}

export default TodoItem;