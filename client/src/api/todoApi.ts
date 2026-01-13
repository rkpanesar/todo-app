import axios from "axios";
import type { Todo } from "../types/Todo"

const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
