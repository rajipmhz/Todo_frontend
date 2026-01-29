import { useEffect, useState, type JSX } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, setToken } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken); 
    }
    setLoading(false); 
  }, [setToken]);


  if (loading) return null; 

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
