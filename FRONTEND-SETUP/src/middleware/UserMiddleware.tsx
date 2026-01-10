import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAppContext from "../context/useContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const UserMiddleware = () => {
  const { setOpenLoginModal } = useAppContext();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  interface JwtToken {
    id?: string;
    name?: string;
    exp?: number;
  }

  const isValidToken = (): boolean => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      const decodeData = jwtDecode<JwtToken>(token);
      
      // Check expiration
      if (decodeData.exp && decodeData.exp * 1000 < Date.now()) {
        return false;
      }
      if (!decodeData?.id) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const valid = isValidToken();
    setIsValid(valid);
    setIsChecking(false);

    if (!valid) {
      setOpenLoginModal(true);
    }
  }, [location?.pathname]);

  
  // Don't render anything until check is complete
  if (isChecking) {
    return null; // Or a loading spinner
  }

  // Redirect if invalid
  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  // Only render protected routes if valid
  return <Outlet />;
};

export default UserMiddleware;












// import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import useAppContext from "../context/useContext";
// import { jwtDecode } from "jwt-decode";
// import { useEffect } from "react";

// const UserMiddleware = () => {
//   const { setOpenLoginModal } = useAppContext();
//     const location = useLocation();
//     const navigate = useNavigate();

//   interface JwtToken {
//     id?: string;
//     name?: string;
//     exp?: number; // Add expiration check
//   }

//   const isValidToken = (): boolean => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setOpenLoginModal(true);
//         return false; // Return false, not JSX
//       }

//       const decodeData = jwtDecode<JwtToken>(token);
      
//       // Check expiration
//       if (decodeData.exp && decodeData.exp * 1000 < Date.now()) {
//         setOpenLoginModal(true);
//         return false;
//       }

//       if (!decodeData?.id) {
//         setOpenLoginModal(true);
//         return false;
//       }

//       return true;
//     } catch (error) {
//       setOpenLoginModal(true);
//       return false;
//     }
//   };



//   useEffect(()=>{
//   // Call the function (you forgot the parentheses!)
//   if (!isValidToken()) {
//      navigate("/")
//      return;
//      ;
//   }
//   },[location?.pathname]);

//   return <Outlet />;
// };

// export default UserMiddleware;