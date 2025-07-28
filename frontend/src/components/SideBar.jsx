import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "60px", height: "100vh", background: "#ddd", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        {/* İkonlar vs eklenebilir */}
      </div>
      <div style={{ padding: "1rem" }}>
        <Link to="/profile">
          <img src="/avatar.png" alt="Profil" width="40" style={{ borderRadius: "50%" }} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
