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
    <nav>
      <div className="navigation">
        <div>
          <Link className="nav__link nav__link--brand" to="/">
            Hit Factory
          </Link>
        </div>

        <div className={`nav__links ${isOpen ? "mobile" : ""}`}>
          <Link className="nav__link" to="/instruments?category=guitar">
            guitar
          </Link>
          <Link className="nav__link" to="/instruments?category=piano">
            piano
          </Link>
          <Link className="nav__link" to="/instruments?category=drums">
            drums
          </Link>
          <Link
            className="nav__link nav__link--other"
            to="/instruments?category="
          >
            other instruments
          </Link>
        </div>

        <div className="nav__icons">
          <div className=" nav__icon menu-icon" onClick={handleToggle}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <Link className="nav__icon" to="/cart">
            <i className="fa fa-shopping-cart" />
            <span className="nav__icon--text">cart</span>
          </Link>
          <DropdownMenu />
          <div className="nav__icon">
            <ReactSwitch
              onColor="#e1e2ef"
              offColor="#05204a"
              className="nav__switch"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="nav__icon--text">mode</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
