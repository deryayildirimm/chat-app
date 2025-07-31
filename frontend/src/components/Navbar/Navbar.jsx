import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <a href="">ChatApp</a>
        </div>
        <ul>
          <li className="active">
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
