import { getCurrentUser } from "../../services/authService";

const user = getCurrentUser();
const Profile = () => {
  return <h1>{user?.name}</h1>;
};
export default Profile;
