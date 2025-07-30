import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div class="hero-section">
            <Outlet />
        </div>
      </main>
      <footer>
        <div class="footer-wrapper">Copyright © Your Website 2025</div>
      </footer>
    </>
  );
};

export default Layout;
