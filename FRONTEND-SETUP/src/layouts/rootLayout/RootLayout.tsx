import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAppContext from "../../context/useContext";
import { jwtDecode } from "jwt-decode";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LoginModal from "../../components/LoginModal";
import UserMenuButton from "../../components/UserMenuButton";


const queryClient = new QueryClient()


const RootLayout = () => {

  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const {setOpenLoginModal} = useAppContext();
    

  return (
       <QueryClientProvider client={queryClient}>
        <LoginModal/>
        
    <div className="h-screen flex flex-col ">
      {/* HEADER START */}
      <header className="bg-primary" >
        <div
        className="layoutWidth bg-primary
        flex py-[21px] items-center justify-between
        h-[70px]

        
        "
        >
        <Link
         to={"/"}
          className="flex items-center font-bold gap-2"
          >
          <img 
          src="/logo.png" 
          alt="app-logo" 
          className="max-w-[32px] w-full h-[32px]"
          />
          <span>CORTEX AI</span>
        </Link>

        <div className="user">

            {
                token ? (
                    <>{
                      (()=>{
                        if(token){
                          interface DecodedToken {
  name?: string;
  picture?: string;
}
                          const decoded = jwtDecode<DecodedToken>(token);
                          return (
                            <div className="flex items-center gap-2">

                              <UserMenuButton decoded={decoded}/>

{/* <button
onClick={()=>navigate("/dashboard")}
  className="
  cursor-pointer
    px-5 py-2.5
    rounded-xl
    text-sm font-semibold
    text-white
    bg-gradient-to-r from-indigo-500 to-purple-600
    hover:from-indigo-600 hover:to-purple-700
    active:scale-[0.98]
    transition-all duration-200
    shadow-md hover:shadow-lg
    focus:outline-none
    
    
    
    
    
    
    
    
    focus:ring-2 focus:ring-purple-400 text-nowrap
  "
>
                                {decoded ? decoded?.name : ""}
</button> */}
                              {/* <img 
                            src={decoded.picture} 
                            alt="avatar"
                            /> */}
                             
                              </div>
                            
                          )

                        }

                    })()
                    
                    } </>
                ):(
                  <button
                  onClick={()=>setOpenLoginModal(true)}
  className="
    px-5 py-2.5
    rounded-xl
    text-sm font-semibold
    text-white
    bg-gradient-to-r from-indigo-500 to-purple-600
    hover:from-indigo-600 hover:to-purple-700
    active:scale-[0.98]
    transition-all duration-200
    shadow-md hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-purple-400
  "
>
  Sign In / Sign Up
</button>

                    
                )
            }
        </div>


        </div>
      </header>
      {/* HEADER END */}

      <main className="flex-1 oveflow-hidden ">
        <Outlet />
      </main>

                </div>
       </QueryClientProvider>

  );
};

export default RootLayout;
