import './App.css'
import TodoList from './components/TodoList'
import Toolbar from './components/Toolbar';
//import { TodoProvider } from './contexts/TodoProvider';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, store, type RootState } from './store/todoStore';
import { useEffect } from 'react';
import { fetchTodo } from './contexts/todoSlice';


function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAutheticated);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(fetchTodo());
    }
  }, [isAuthenticated, dispatch]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/todos" element={
              isAuthenticated ? (
                <>
                  <Toolbar />
                  <TodoList />
                </>
              ) : (
                <Navigate to="/" replace />
              )
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
}

export default App
