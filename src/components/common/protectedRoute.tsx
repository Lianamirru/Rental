import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({
  children,
  hint,
}: {
  children: JSX.Element;
  hint: String;
}) => {
  const user = getCurrentUser();

  return user ? children : <p>{hint}</p>;
};

export default ProtectedRoute;
