import type React from "react"
import type { Todo } from "../types/Todo"
import { useState } from "react"
//import { TodoContext } from "../contexts/TodoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, faSave, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { type AppDispatch } from "../store/todoStore"
import { createTodo, deleteTodo, fetchTodo, replacePendingTodoItem, toggleTodo, updateTodo } from "../contexts/todoSlice"

type Props = {
    todo: Todo
}

const TodoItem:React.FC<Props> = ({
    todo
}) => {

    const [isInEditMode, setIsInEditMode] = useState(todo._id.includes("temp") ? true : false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
   // const {getTodo, addTodo, editTodo, deleteTodoItem, toggleTodo} = useContext(TodoContext);
    const dispatch = useDispatch<AppDispatch>();


    const saveUpdates = async (id: string) => {
        if(todo._id.includes("temp")) {
           await dispatch(createTodo({title: updatedTitle}));
           dispatch(replacePendingTodoItem(id));
        }//addTodo(updatedTitle, id);
        
        else {
            if(updatedTitle !== todo.title) {    
               // editTodo(id, updatedTitle);
               await dispatch(updateTodo({id, title: updatedTitle}));
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
                        onChange={async(e) => {await dispatch(toggleTodo({id: todo._id, isCompleted: e.target.checked}))}}
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
                                    onClick={async () => await dispatch(fetchTodo())}>
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
                                    onClick={async () => await dispatch(deleteTodo({id: todo._id}))}>
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