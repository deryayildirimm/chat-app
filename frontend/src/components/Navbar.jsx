import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div class="header-wrapper">
        <div class="logo">
          <a href="">ChatApp</a>
        </div>
        <ul>
          <li class="active">
            {" "}
            <Link to="/login">Login</Link>
          </li>
          <li>
            {" "}
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
