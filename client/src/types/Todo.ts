export interface Todo {
    _id: string;
    title: string;
    // description?: string;
    completed: boolean;
    createdAt: Date;
    isNew?: boolean;
}

export type FilterState = {
    search: string;
    status: "all" | "completed" | "pending"
}

export type SortOption =
    | "created-asc"
    | "created-desc"
    | "title-asc"
    | "title-desc";

export type TodoState = {
    todos: Todo[];
    filters: FilterState;
    sort: SortOption;
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
    | {type: "REPLACE_TEMP_TODO"; payload: {tempId: string, realTodo: Todo}}