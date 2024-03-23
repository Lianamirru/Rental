import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getCurrentUser();

  const toggleDropdown = () => {
    if (user) setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);

    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  const renderIcon = () => {
    return (
      <>
        <i className="fa-solid fa-user " />
        <span className="nav__icon--text">profile</span>
      </>
    );
  };

  return (
    <button className="dropdown" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        {!user ? (
          <Link className="nav__icon" to={"/login"}>
            {renderIcon()}
          </Link>
        ) : (
          <div className="nav__icon">{renderIcon()}</div>
        )}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-content">
          <li onClick={() => setIsDropdownOpen(false)}>
            <Link to="/profile">
              <p className="drop-down-item">Profile Information</p>
            </Link>
          </li>
          <li onClick={() => setIsDropdownOpen(false)}>
            <Link to="/favorites">
              <p className="drop-down-item">Favorites</p>
            </Link>
          </li>
          <li onClick={() => setIsDropdownOpen(false)}>
            <Link to="/rentals">
              <p className="drop-down-item">Rented Instruments</p>
            </Link>
          </li>

          <li>
            <Link to="/logout">
              <p className="drop-down-item">Logout</p>
            </Link>
          </li>
        </ul>
      )}
    </button>
  );
};

export default DropdownMenu;
