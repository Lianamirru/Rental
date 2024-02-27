import { getCurrentUser } from "../../services/authService";

const user = getCurrentUser();
const Profile = () => {
  return <h1>{user?.email}</h1>;
};
export default Profile;
