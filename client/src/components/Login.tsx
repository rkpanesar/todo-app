import React, { useState } from "react";
// import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/todoStore";
import { login } from "../contexts/authSlice";
import { fetchTodo } from "../contexts/todoSlice";

// const API_URL = "http://localhost:5000/login";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const { getTodo, login } = useContext(TodoContext) as any;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await dispatch(login({username, password}));
      
      // Check if login was successful
      if (result.type === login.fulfilled.type) {
        setMessage("Login successful! Fetching todos...");
        await  dispatch(fetchTodo());
        navigate('/todos');
      } else {
        setMessage("Login failed");
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 5 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 5 }}
          />
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
