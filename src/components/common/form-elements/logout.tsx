import { useEffect } from "react";
import { logout } from "../../../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location.replace("/");
  }, []);

  return null;
};

export default Logout;
