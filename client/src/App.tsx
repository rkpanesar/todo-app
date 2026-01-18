import './App.css'
import TodoList from './components/TodoList'
import Toolbar from './components/Toolbar';
import { TodoProvider } from './contexts/TodoProvider';

function App() {
 
  return (
    <TodoProvider>
      <Toolbar/>
      <TodoList/>
    </TodoProvider>
  )
}

export default App
