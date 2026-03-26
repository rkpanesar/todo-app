// import { useContext } from "react";
// import { TodoContext } from "../contexts/TodoContext";
import { useDispatch, useSelector } from "react-redux";
import {type AppDispatch, type RootState } from "../store/todoStore";
import { applyFilters } from "../contexts/todoSlice";

const Filter = () => {
   // const {todoState, applyFilters} = useContext(TodoContext);
    const dispatch = useDispatch<AppDispatch>();
    const todoState = useSelector((state: RootState) => state.todo);

    return (
        <div>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="search..."
                className="border rounded"
                value={todoState.filters.search}
                onChange={(e)=> dispatch(applyFilters({search: e.target.value}))}
            />
            <select
                id="status"
                name="status" 
                className="bg-black"
                value={todoState.filters.status}
                onChange={(e) => dispatch(applyFilters({status: e.target.value as never}))}
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    )
}

export default Filter;