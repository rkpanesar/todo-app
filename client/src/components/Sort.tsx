import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import type { SortOption } from "../types/Todo";

const Sort = () => {
    const {todoState, applySorting} = useContext(TodoContext);
    
    return (
        <div>
            <select
                id="sort"
                name="sort" 
                className="bg-black"
                value={todoState.sort}
                onChange={(e) => applySorting(e.target.value as SortOption)}
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