import './App.css'
import AddTodoItem from './components/AddTodoItem'

import TodoList from './components/TodoList'
import { TodoProvider } from './contexts/TodoProvider';

function App() {
 
  return (
    <TodoProvider>
      <AddTodoItem/>
      <TodoList/>
    </TodoProvider>
  )
}

export default App
