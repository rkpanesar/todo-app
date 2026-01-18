import React, { useEffect, useMemo, useReducer } from "react";
import { type TodoAction,type TodoState, type Todo, type FilterState, type SortOption } from '../types/Todo'
import { 
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../api/todoApi";
import { TodoContext } from "./TodoContext";
import { Slide, toast, ToastContainer } from "react-toastify";

const initialState: TodoState = {
  todos: [],
  filters: {
    search: "",
    status: "all",
  },
  sort: "created-desc",
  loading: false,
  error: null,
}

export function TodoProvider({children}:{children:React.ReactNode}) {
    const [todosState, dispatch] = useReducer(todosReducer, initialState);
    
    const filteredAndSortedTodos = useMemo(() => {
        const result = [...todosState.todos];

        const temps = result.filter((todo) => todo.isNew);
        let realTodos = result.filter((todo) => !todo.isNew);
        
        //search
        if(todosState.filters.search.trim()) {
            realTodos = realTodos.filter((todo) => {
                return todo.title.toLowerCase().includes(todosState.filters.search.toLowerCase());
            })
        }

        //status
        if(todosState.filters.status === "completed") {
            realTodos = realTodos.filter((todo) =>  todo.completed);
        } else if (todosState.filters.status === "pending") {
            realTodos = realTodos.filter((todo) =>  !todo.completed);
        }

        //sort
        switch(todosState.sort) {
            case "created-asc": {
                realTodos = realTodos.sort((a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
                break;
            }
            case "created-desc": {
                realTodos = realTodos.sort((a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
                break;
            }
            case "title-asc": {
                realTodos = realTodos.sort((a, b) => a.title.localeCompare(b.title));
                break;
            }
            case "title-desc": {
                realTodos = realTodos.sort((a, b) => b.title.localeCompare(a.title));
                break;
            }
        }

        return [...temps, ...realTodos];
    }, [todosState.todos, todosState.filters, todosState.sort]);

    const getTodo = async () => {
        dispatch({type:"LOADING"});

        try {
            const todoData = await fetchTodos();
            dispatch({ type: "FETCH", payload: todoData });
        } catch(error) {
            console.log(error);
            dispatch({type: "ERROR", payload:"Failed to fetch data"});
        }
    }

    useEffect(() => {
        getTodo();
    }, []);

 

    //CRUD Actions
    const addTodo = async(title:string, tempId: string) => {
        dispatch({type: "LOADING"});   
        try {
            const data = await createTodo(title);
            dispatch({type: "REPLACE_TEMP_TODO", payload:{tempId, realTodo: data}});
            toast.success("Todo added successfully!");
        } catch (error) {
            console.log(error);
            dispatch({type:"DELETE_PENDING", payload:tempId});
            dispatch({type:"ERROR", payload:"Failed to add todo"});
            toast.error("Failed to add todo");
        }
    }

    const editTodo = async (id:string, title: string) => {
        dispatch({type: "LOADING"});
        try {
            const data = await updateTodo(id, {title});
            dispatch({type:"UPDATE", payload: data});
            toast.success("Updated successfully!")
        } catch(error) {
            console.log(error);
            dispatch({type:"ERROR", payload:"Failed to update todo"});
            toast.error("Failed to update");
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
            toast.error("Failed to update");
        }
    }

    const deleteTodoItem = (id: string) => {
        dispatch({type: "LOADING"});
        try {
            if(!id.includes("temp")) deleteTodo(id);
            dispatch({type:"DELETE", payload:id});
            toast.success("Deleted successfully!");
        } catch(error) {
            console.log(error);
            dispatch({type:"ERROR", payload:"Failed to delete data"});
            toast.error("Failed to delete");
        }
    }

    const addPendingTodoItem = (payload: Todo) => {
        const tempId = "temp-" + Math.random().toString(36).slice(2);
        payload._id = tempId;
        dispatch({type: "ADD_PENDING", payload});
    }

    const applyFilters = (payload: Partial<FilterState>) => {
        dispatch({type: "SET_FILTER", payload});
    }

    const applySorting = (payload: SortOption) => {
        dispatch({type: "SET_SORT", payload});
    }

    return (
        <TodoContext value={{
            todoState: todosState,
            filteredAndSortedTodos,
            getTodo,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodoItem,
            addPendingTodoItem,
            applyFilters,
            applySorting
        }}>
            {children}
            <ToastContainer 
                position="bottom-right" 
                newestOnTop 
                pauseOnFocusLoss={false} 
                pauseOnHover={false}
                hideProgressBar
                transition={Slide}
            />
        </TodoContext>
    )
}



const todosReducer = (todosState:TodoState, action: TodoAction): TodoState => {
  switch(action.type) {
    case 'LOADING':{
      return {...todosState, loading: true, error: null};
    }
    case 'FETCH' : {
      return {todos: action.payload, filters: {...todosState.filters}, sort: todosState.sort, loading: false, error: null};
    }
    case "REPLACE_TEMP_TODO":{
        return {
            ...todosState,
            todos: todosState.todos.map(t =>
                t._id === action.payload.tempId ? action.payload.realTodo : t
            ),
            loading: false,
            error: null
        };
    }
    case 'ADD': 
    case 'ADD_PENDING': {
        return {
            todos: [
                ...todosState.todos,
                action.payload,
            ],
            filters: {...todosState.filters},
            sort: todosState.sort,
            loading: false,
            error: null
        }
    }
    case 'UPDATE': {
      return {
        todos: todosState.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
        filters: {...todosState.filters},
        sort: todosState.sort,
        loading: false,
        error: null
      };
    }
    case 'DELETE': 
    case 'DELETE_PENDING': {
      return{
        todos: todosState.todos.filter(todo => todo._id !== action.payload),
        filters: {...todosState.filters},
        sort: todosState.sort,
        loading: false,
        error: null
      };
    }
    case 'ERROR': {
        return {...todosState, loading: false, error: action.payload};
    }
    case 'SET_FILTER' :{
    
        return {
            ...todosState,
            filters: {
                ...todosState.filters,
                ...action.payload
            },
            loading: false,
            error: null
        }
    }
    case 'SET_SORT': {
        return {
            ...todosState,
            sort: action.payload,
            loading: false,
            error: null
        }
    }
    default: {
      throw Error("Unknown action");
    }
  }

}
