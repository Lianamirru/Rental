import { Link } from "react-router-dom";
import { useState } from "react";
import ReactSwitch from "react-switch";

import { useTheme } from "../../context/ThemeContext";
import DropdownMenu from "./dropDown";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="navigation">
        <Link className="nav__link nav__link--brand" to="/">
          Hit Factory
        </Link>

        <div className="nav-links-wrapper">
          <button
            className="nav__icon menu-icon"
            onClick={handleToggle}
            aria-controls="instrument-links"
            aria-expanded={isOpen}
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
            <span className="visually-hidden">Instruments' Categories</span>
          </button>
          <div className={`nav-links ${isOpen ? "mobile" : ""}`}>
            <ul id="instrument-links" role="list">
              <li>
                <Link className="nav__link" to="/instruments?category=guitar">
                  guitar
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/instruments?category=piano">
                  piano
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/instruments?category=drums">
                  drums
                </Link>
              </li>
              <li>
                <Link
                  className="nav__link nav__link--other"
                  to="/instruments?category="
                >
                  other instruments
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav-icons">
          <button>
            <Link to="/cart" className="nav__icon">
              <i className="fa fa-shopping-cart" />
              <span className="nav__icon--text">cart</span>
            </Link>
          </button>
          <DropdownMenu />
          <button className="nav__icon">
            <ReactSwitch
              onColor="#e1e2ef"
              offColor="#05204a"
              className="nav__switch"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="nav__icon--text nav__switch--text">mode</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
