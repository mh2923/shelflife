import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          ShelfLife
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end className={linkClass}>
            Discover
          </NavLink>
          <NavLink to="/shelves" className={linkClass}>
            My Shelves
          </NavLink>
          <NavLink to="/statistics" className={linkClass}>
            Statistics
          </NavLink>
        </nav>

        <div className="navbar-avatar" aria-hidden="true">
          <span>Y</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;