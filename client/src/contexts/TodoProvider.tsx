import React, { useEffect, useReducer } from "react";
import { type TodoAction,type TodoState } from '../types/Todo'
import { 
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../api/todoApi";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
}

import { TodoContext } from "./TodoContext";

export function TodoProvider({children}:{children:React.ReactNode}) {
    const [todosState, dispatch] = useReducer(todosReducer, initialState);
    
    useEffect(() => {
        const fetchdata = async () => {
            dispatch({type:"LOADING"});

            try {
                const todoData = await fetchTodos();
                dispatch({ type: "FETCH", payload: todoData });
            } catch(error) {
                console.log(error);
                dispatch({type: "ERROR", payload:"Failed to fetch data"});
            }
        }

        fetchdata();
    }, []);

    //CRUD Actions
    const addTodo = async(title:string) => {
        dispatch({type: "LOADING"});   
        try {
            const data = await createTodo(title);
            dispatch({type: "ADD", payload:data});
        } catch (error) {
            console.log(error);
            dispatch({type:"ERROR", payload:"Failed to add todo"});
        }
    }

    const editTodo = async (id:string, title: string) => {
        dispatch({type: "LOADING"});
        try {
            const data = await updateTodo(id, {title});
            dispatch({type:"UPDATE", payload: data});
        } catch(error) {
            console.log(error);
            dispatch({type:"ERROR", payload:"Failed to update todo"});
        }
    }

    const toggleTodo = async (id: string, isCompleted: boolean) => {
        dispatch({type:"LOADING"});
        try {
            const data = await updateTodo(id, {completed: isCompleted});
            dispatch({type:"UPDATE", payload: data});
        } catch(error) {
            console.log(error);
            dispatch({type:"ERROR", payload:"Failed to update todo"});
        }
    }

    const deleteTodoItem = (id: string) => {
        dispatch({type: "LOADING"});
        try {
        deleteTodo(id);
        dispatch({type:"DELETE", payload:id});
        } catch(error) {
        console.log(error);
        dispatch({type:"ERROR", payload:"Failed to delete data"});
        }
    }

    return (
        <TodoContext value={{
            todoState: todosState,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodoItem
        }}>
            {children}
        </TodoContext>
    )
}


const todosReducer = (todosState:TodoState, action: TodoAction) => {
  switch(action.type) {
    case 'LOADING':{
      return {...todosState, loading: true, error: null};
    }
    case 'FETCH' : {
      return {todos: action.payload, loading: false, error: null};
    }
    case 'ADD': {      
      return {
        todos: [
          ...todosState.todos,
          action.payload
        ],
        loading: false,
        error: null 
      };
    }
    case 'UPDATE': {
      return {
        todos: todosState.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
        loading: false,
        error: null
      };
    }
    case 'DELETE': {
      return{
        todos: todosState.todos.filter(todo => todo._id !== action.payload),
        loading: false,
        error: null
      };
    }
    case 'ERROR': {
      return {...todosState, loading: false, error: action.payload};
    }
    default: {
      throw Error("Unknown action");
    }
  }

}
