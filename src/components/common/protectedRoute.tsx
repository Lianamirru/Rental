import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentUser();

  return user ? children : <div>Login to rent</div>;
};

export default ProtectedRoute;
