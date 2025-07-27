import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

function App() {

  const router = createBrowserRouter([
    {path : "/login" , element: <Login/> },
    {path : "/register" , element: <Register/> },
    {path : "/chat" , element: <Chat/> },
    {path : "/profile" , element: <Profile/> },
     {path : "/" , element: <Home/> },

  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
