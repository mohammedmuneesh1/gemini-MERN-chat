import { Navigate, Outlet } from "react-router-dom";
import useAppContext from "../context/useContext";
import { jwtDecode } from "jwt-decode";

const UserMiddleware = () => {
  const { setOpenLoginModal } = useAppContext();

  interface JwtToken {
    id?: string;
    name?: string;
    exp?: number; // Add expiration check
  }

  const isValidToken = (): boolean => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setOpenLoginModal(true);
        return false; // Return false, not JSX
      }

      const decodeData = jwtDecode<JwtToken>(token);
      
      // Check expiration
      if (decodeData.exp && decodeData.exp * 1000 < Date.now()) {
        setOpenLoginModal(true);
        return false;
      }

      if (!decodeData?.id) {
        setOpenLoginModal(true);
        return false;
      }

      return true;
    } catch (error) {
      setOpenLoginModal(true);
      return false;
    }
  };

  // Call the function (you forgot the parentheses!)
  if (!isValidToken()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserMiddleware;