
import React from "react";
import useAppContext from "../context/useContext";


const LoginModal= () => {

    const {openLoginModal,setOpenLoginModal} = useAppContext();


  if (!openLoginModal) return null;

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // plug your OAuth logic here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-xl bg-primary p-6 relative border border-zinc-500/20 hover:border-zinc-400 duration-500 transition-all  ">
        
        <button
          onClick={()=>setOpenLoginModal(false)}
          className="absolute right-3 top-3 text-gray-400 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Sign in to continue
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-lg
                     border border-gray-200/20
                     hover:border-gray-200
                      py-2 font-medium cursor-pointer
                      transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

      </div>
    </div>
  );
};

export default LoginModal;
