import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div class="hero-section">
          <div class="container">
            <Outlet />
          </div>
        </div>
      </main>

      <footer>
        <div class="footer-wrapper">Copyright © Your Website 2025</div>
      </footer>
    </>
  );
};

export default Layout;
