import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/shelflife-logo.png";

function Navbar({ links }) {
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src={logo}
            alt="ShelfLife"
            className="navbar-logo-image"
          />
        </Link>


          <nav className="navbar-links">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>


        <div className="navbar-avatar" aria-hidden="true">
          <span>Y</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;