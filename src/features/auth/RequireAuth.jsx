import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentClinic,
  selectCurrentToken,
  selectCurrentUserRole,
} from "./authSlice";

function RequireAuth({ allowedRole }) {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentUserRole);
  const clinic = useSelector(selectCurrentClinic);
  console.log(clinic);

  const location = useLocation();

  if (clinic) {
    return <Outlet />;
  }
  return token ? (
    <>
      {allowedRole === role ? (
        <Outlet />
      ) : (
        <Navigate to="/unauthenticated" state={{ from: location }} replace />
      )}
    </>
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
