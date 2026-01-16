import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserMenuButton = ({ decoded }: { decoded: any }) => {

    console.log('decoded',decoded);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!decoded) return null;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen((p) => !p)}
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
          focus:ring-2 focus:ring-purple-400
          text-nowrap
        "
      >
        {decoded.name}
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40
            rounded-xl
            bg-white
            shadow-xl
            border border-gray-100
            overflow-hidden
            z-50
          "
        >

          <button
            onClick={logout}
            className="cursor-pointer
              w-full px-4 py-2 text-left text-sm
              text-red-600
              hover:bg-red-50 transition
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenuButton;
