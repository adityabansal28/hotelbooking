import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get("http://localhost:3003/users");
            const user = response.data.find((u) => u.username === username && u.password === password);
    
            if (user) {
                setUser(user.username);
                localStorage.setItem("user", user.username);
                navigate("/");
            } else {
                setError("Invalid username or password!");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong! Check if the server is running.");
        }
    };
    
    return (
        <div>
            <Navbar />
            <h2>Login</h2>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
