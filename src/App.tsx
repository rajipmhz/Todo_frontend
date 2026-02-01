
import { Routes, Route, useLocation} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Todos from "./pages/Todos";
import Dashboard from "./pages/Dashboard";
import Header from "./components/layout/Header";
import About from "./pages/About";
import {Toaster} from 'react-hot-toast'
const App= () => {
  const location=useLocation();
  const hideHeader =
    location.pathname === "/todos"||
    location.pathname==="/login"||
    location.pathname==="/register";

  return (
    <>
     <Toaster position="top-right" />
    {!hideHeader && <Header/>}
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <Todos/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
  );
};

export default App;
