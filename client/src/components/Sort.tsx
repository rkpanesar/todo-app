// import { useContext } from "react";
// import { TodoContext } from "../contexts/TodoContext";
import type { SortOption } from "../types/Todo";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/todoStore";
import { applySorting } from "../contexts/todoSlice";

const Sort = () => {
    const dispatch = useDispatch<AppDispatch>();
    const todoState = useSelector((state: RootState) => state.todo);
    
    return (
        <div>
            <select
                id="sort"
                name="sort" 
                className="bg-black"
                value={todoState.sort}
                onChange={(e) => dispatch(applySorting(e.target.value as SortOption))}
            >
                <option value="created-desc">Neweset</option>
                <option value="created-asc">Oldest</option>
                <option value="title-asc">A → Z</option>
                <option value="title-desc">Z → A</option>
            </select>
        </div>
    )
}

export default Sort;