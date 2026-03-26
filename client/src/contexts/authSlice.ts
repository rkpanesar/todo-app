import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/Todo";
import {login as loginApi, logout as logoutApi} from '../api/todoApi';

interface AuthState {
    isAutheticated: boolean;
    user: User | null;
}

// Load auth state from localStorage
const getInitialState = (): AuthState => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
        try {
            return JSON.parse(savedAuth);
        } catch {
            return { isAutheticated: false, user: null };
        }
    }
    return { isAutheticated: false, user: null };
};

const initialState: AuthState = getInitialState();

export const login = createAsyncThunk('todos/login',
    async(payload: {username: string, password: string}, {rejectWithValue}) => {
        try {
            await loginApi(payload.username, payload.password);
            return payload.username;
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
)

export const logout = createAsyncThunk('todos/logout',
    async(_, {rejectWithValue}) => {
        try {
            await logoutApi();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAutheticated = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAutheticated = true;
                state.user = { username: action.payload } as User;
                // Persist to localStorage
                localStorage.setItem('auth', JSON.stringify(state));
            })
            .addCase(login.rejected, (state) => {
                state.isAutheticated = false;
                state.user = null;
                localStorage.removeItem('auth');
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAutheticated = false;
                state.user = null;
                // Clear from localStorage
                localStorage.removeItem('auth');
            })
    }
});

export default authSlice.reducer;