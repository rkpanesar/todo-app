// import {configureStore} from "@reduxjs/toolkit";

import { combineReducers, configureStore} from "@reduxjs/toolkit";
import todoReducer from "../contexts/todoSlice";
import authReducer from "../contexts/authSlice";

// export const todoStore = configureStore({
//     reducer:{
//         todo: todoReducer
//     }
// });

// export type RootState = ReturnType<typeof todoStore.getState>;
// export type AppDispatch = typeof todoStore.dispatch;

export const combinedReducers = combineReducers({
    todo: todoReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: combinedReducers
});

// function setupStore(preloadedState?:  Partial<RootState>) {
//     return configureStore({
//         reducer: combinedReducers,
//         preloadedState
//     })
// }

// export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof combinedReducers>;


export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;