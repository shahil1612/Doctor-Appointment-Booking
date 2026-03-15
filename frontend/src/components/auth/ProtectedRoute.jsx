import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserType } from "../../store/authSlice";

const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userType) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userType !== allowedRole) {
    const fallbackRoute =
      userType === "DOCTOR" ? "/doctor-dashboard" : "/patient-dashboard";
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;
