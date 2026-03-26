import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../store/store";

import type { TodoState, FilterState, SortOption, Todo } from "../types/Todo";
import { createTodoAPI, deleteTodoAPI, fetchTodosAPI, updateTodoAPI } from "../api/todoApi";

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

export const fetchTodo = createAsyncThunk('todos/fetchTodo',
    async(_, {rejectWithValue}) => {
        try {
            const data = await fetchTodosAPI();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }

    }
);

export const createTodo = createAsyncThunk('todos/createTodo',
    async(payload: { title: string}, {rejectWithValue}) => {
        try {
            const data = await createTodoAPI(payload.title);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const updateTodo = createAsyncThunk('todos/updateTodo',
    async(payload: {id: string, title: string}, {rejectWithValue}) => {
        try {
            const data = await updateTodoAPI(payload.id, {title: payload.title});
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const toggleTodo = createAsyncThunk('todos/toggleTodo',
    async(payload: {id: string, isCompleted: boolean}, {rejectWithValue}) => {
        try {
            const data = await updateTodoAPI(payload.id, {completed: payload.isCompleted});
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async(payload: {id: string}, {rejectWithValue}) => {
        try {
            await deleteTodoAPI(payload.id);
            return payload.id;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addPendingTodoItem: (state, action: PayloadAction<Todo>) => {
            const tempId = "temp-" + Math.random().toString(36).slice(2);
            action.payload._id = tempId;
            state.todos.push(action.payload);
        },
        replacePendingTodoItem: (state, action) => {
            state.todos = state.todos.map(t =>
                t._id === action.payload.tempId ? action.payload.realTodo : t
            );
            // state.todos = state.todos.filter(t => t._id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        applyFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        applySorting: (state, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(createTodo.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map(todo => todo._id === action.payload?._id ? action.payload : todo);
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(toggleTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.map(todo => todo._id === action.payload?._id ? action.payload : todo);
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo._id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})


export const {addPendingTodoItem, replacePendingTodoItem, applyFilters, applySorting} = todoSlice.actions;

export default todoSlice.reducer;