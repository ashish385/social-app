// This will prevent authenticated users from accessing this route
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  // const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem("token"))

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default OpenRoute;
