import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const Filter = () => {
    const {todoState, applyFilters} = useContext(TodoContext);
    
    return (
        <div>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="search..."
                className="border rounded"
                value={todoState.filters.search}
                onChange={(e)=> applyFilters({search: e.target.value})}
            />
            <select
                id="status"
                name="status" 
                className="bg-black"
                value={todoState.filters.status}
                onChange={(e) => applyFilters({status: e.target.value as never})}
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    )
}

export default Filter;