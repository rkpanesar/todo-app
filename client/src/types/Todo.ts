import type { FilterState, SortOption } from "./FilteringAndSorting";

export interface Todo {
    _id: string;
    title: string;
    // description?: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoState = {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

export type TodoAction = 
    | { type: "ADD"; payload: Todo }
    | { type: "ADD_PENDING"; payload: Todo}
    | { type: "DELETE"; payload: string }
    | { type: "DELETE_PENDING"; payload: string}
    | { type: "LOADING"}
    | { type: "UPDATE"; payload: Todo}
    | { type: "ERROR"; payload: string}
    | { type: "FETCH"; payload: Todo[]}
    | { type: "SET_FILTER"; payload: Partial<FilterState>}
    | { type: "SET_SORT"; payload: SortOption}