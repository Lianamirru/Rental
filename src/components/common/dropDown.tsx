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
    <div className="dropdown" ref={dropdownRef}>
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
        <div className="dropdown-content">
          <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
            Profile Information
          </Link>
          <Link to="/favorites" onClick={() => setIsDropdownOpen(false)}>
            Favorites
          </Link>
          <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
            Rented Instruments
          </Link>
          <Link to="/logout">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
