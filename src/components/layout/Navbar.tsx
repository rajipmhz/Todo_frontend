import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import DeleteConfirm from "../DeletePopUp";
import ChangePassword from "../ChangePassword";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePassword,setshowChangePassword]=useState(false);''

  return (
    <div
      className="flex justify-between items-center px-6 h-16
      bg-gradient-to-r from-blue-900 to-indigo-800
      text-white shadow-md"
    >
      <h1 className="font-extrabold text-lg tracking-wide">
        Todo App
      </h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setOpen(!open)}
          >
            <div className="bg-white rounded-full p-4 h-2 w-2 hover:scale-125 transition " />
            {
              open && (
                <div className="absolute right-0 mt-3 w-50 bg-white backdrop-blur 
                border border-black rounded-xl shadow-lg p-3 flex flex-col gap-3 z-50
               overflow-hidden
                ">
                  <div className="flex flex-cols-2 gap-3 items-center hover:bg-gray-400/20">
                    <div className="flex justify-center">
                      <div className="bg-blue-700 rounded-full h-6 w-6 transtion" />
                    </div>

                    <div className="flex flex-col overflow-hidden">
                      <span className="text-black font-medium truncate">
                        {user?.name}
                      </span>
                      <span className="text-black text-sm truncate">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => {
                    setOpen(false);
                    setshowChangePassword(true);
                  }}
                    className=" text-black text-lg transition hover:underline hover:bg-gray-400/20"
                  >
                    change password
                  </button>

                  <button onClick={() => {
                    setOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                    className=" text-black text-lg transition hover:text-red-600 hover:bg-gray-400/20"
                  >
                    Logout
                  </button>
                </div>
              )
            }
          </button>

        </div>
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
    
        {showChangePassword && (
          <ChangePassword onClose={()=>setshowChangePassword(false)}/>
        )}

      </div>
    </div>
  );
};

export default Navbar;
