import  {createContext } from "react";
import {type TodoState } from '../types/Todo'

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
}

export const TodoContext = createContext<{
    todoState: TodoState,
    addTodo: (title: string) => void,
    toggleTodo: (id:string, isCompleted: boolean) => void,
    editTodo: (id:string, title:string) => void,
    deleteTodoItem: (id:string) => void
}>({
    todoState: initialState,
    addTodo: () => {},
    toggleTodo: () => {},
    editTodo: () => {},
    deleteTodoItem:() => {},
});


