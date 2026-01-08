import React, { useEffect, useState } from 'react'
import "./DashboardLayout.css"
import { Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import ChatList from '../../components/ChatList';


const DashboardLayout = () => {

  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/sign-in", { replace: true });
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode(token);

  //     // token expired
  //     if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
  //       localStorage.removeItem("token");
  //       navigate("/sign-in", { replace: true });
  //       return;
  //     }

  //     // invalid payload
  //     if (!(decoded as any).uId ) {
  //       localStorage.removeItem("token");
  //       navigate("/sign-in", { replace: true });
  //       return;
  //     }

  //   } catch (err) {
  //     // malformed token
  //     localStorage.removeItem("token");
  //     navigate("/sign-in", { replace: true });
  //   }
  // }, [navigate]);


  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-full bg-yellow-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }


  return (
    <div
     className='h-[calc(100vh-70px)]  !overflow-hidden   bg-primary
      flex 
      '>
        {/* // pt-[20px]; */}
        {/* // h-[100vh-21px] */}

        {/* <button
  className="md:hidden p-2"
  onClick={() => setIsMenuOpen(true)}
>
  ☰
</button> */}
      
<div
  id="menu"
  className={`
    fixed inset-y-0 left-0 z-40
    w-[260px]
    bg-[#1f1d2b]
    border-r border-gray-400/20
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    md:static md:flex-none
  `}
>
  <ChatList />
</div>


      <div className="flex-4 bg-primary2">
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout