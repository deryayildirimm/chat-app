import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          userName,
          password,
        },
        {
          withCredentials: true,
        }
      );
      login(result.data.token);
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleClick}>
        <input
          type="userName"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
