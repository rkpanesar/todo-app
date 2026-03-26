import axios from "axios";
import type { Todo } from "../types/Todo";

const api = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

const toClientTodo = (todo: Todo): Todo => ({
  ...todo,
  createdAt: typeof todo.createdAt === "string" ? Date.parse(todo.createdAt) :
    typeof todo.createdAt === "number" ? todo.createdAt :
    new Date(todo.createdAt).getTime(),
});

export const fetchTodosAPI = async (): Promise<Todo[]> => {
  const res = await api.get<Todo[]>('/todos');
  return res.data.map(toClientTodo);
};

export const createTodoAPI = async (title: string): Promise<Todo> => {
  const res = await api.post<Todo>('/todos', { title });
  return toClientTodo(res.data);
};

export const updateTodoAPI = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
  const res = await api.put<Todo>(`/todos/${id}`, updates);
  return toClientTodo(res.data);
};

export const deleteTodoAPI = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

export const login = async (username: string, password: string) => {
  const res = await api.post('/login', { username, password });
  return res.data;
};

export const logout = async () => {
  await api.post('/logout');
};
