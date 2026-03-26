import  {createContext } from "react";
import {type TodoState, type Todo, type FilterState, type SortOption, type User } from '../types/Todo'

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

export const TodoContext = createContext<{
  todoState: TodoState,
  filteredAndSortedTodos: Todo[],
  getTodo:() => void,
  addTodo: ( title: string, tempId: string) => void,
  toggleTodo: (id:string, isCompleted: boolean) => void,
  editTodo: (id:string, title:string) => void,
  deleteTodoItem: (id:string) => void,
  addPendingTodoItem: (payload: Todo) => void,
  applyFilters: (payload: Partial<FilterState>) => void,
  applySorting: (payload: SortOption) => void,
  // auth
  isAuthenticated: boolean,
  user: User | null,
  login: (username: string, password: string) => Promise<boolean>,
  logout: () => Promise<void>,
}>(
{
  todoState: initialState,
  filteredAndSortedTodos: [],
  getTodo: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  editTodo: () => {},
  deleteTodoItem:() => {},
  addPendingTodoItem: () => {},
  applyFilters: () => {},
  applySorting: () => {},
  isAuthenticated: false,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_username: string, _password: string) => false,
  logout: async () => {},
});


