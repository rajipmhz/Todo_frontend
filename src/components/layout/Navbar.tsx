import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import DeleteConfirm from "../DeletePopUp";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div
      className="flex justify-between items-center px-6 h-16
      bg-gradient-to-r from-blue-900 to-indigo-800
      text-white shadow-md"
    >
      {/* App name */}
      <h1 className="font-extrabold text-lg tracking-wide">
        Todo App
      </h1>

      <div className="flex items-center gap-4">
  
        <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
          {user?.name}
        </span>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="px-4 py-2 bg-red-500/90 text-white rounded-lg
          hover:bg-red-600 transition shadow"
        >
          Logout
        </button>


        {showLogoutConfirm && (
          <DeleteConfirm
            title="Logout"
            message="Are you sure you want to logout?"
            onClose={() => setShowLogoutConfirm(false)}
            confirmText="Logout"
            onConfirm={() => {
              logout();
              setShowLogoutConfirm(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
