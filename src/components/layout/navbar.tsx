import { Link } from "react-router-dom";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import ReactSwitch from "react-switch";

import { useTheme } from "../../context/ThemeContext";
import DropdownMenu from "./dropDown";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="navigation">
        <HashLink className="nav__link nav__link--brand" to="/">
          Hit Factory
        </HashLink>

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
                <HashLink
                  smooth
                  className="nav__link"
                  data-active={"guitar" === active}
                  to="/instruments?category=guitar#instruments-section"
                  onClick={() => setActive("guitar")}
                >
                  guitar
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  className="nav__link"
                  data-active={"piano" === active}
                  to="/instruments?category=piano#instruments-section"
                  onClick={() => setActive("piano")}
                >
                  piano
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  className="nav__link"
                  data-active={"drums" === active}
                  to="/instruments?category=drums#instruments-section"
                  onClick={() => setActive("drums")}
                >
                  drums
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  className="nav__link nav__link--other"
                  data-active={"others" === active}
                  to="/instruments?category=#instruments-section"
                  onClick={() => setActive("others")}
                >
                  other instruments
                </HashLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav-icons">
          <button>
            <HashLink to="/cart" className="nav__icon">
              <i className="fa fa-shopping-cart" />
              <span className="nav__icon--text">cart</span>
            </HashLink>
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
