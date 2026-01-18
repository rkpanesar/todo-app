import AddTodoItem from "./AddTodoItem";
import Filter from "./Filter";
import Sort from "./Sort";

const Toolbar = () => {
    return (
        <div className="flex justify-between">
            <AddTodoItem/>
            <Filter/>
            <Sort/>
        </div>
    );
}

export default Toolbar;