import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth/auth.slice";

const AuthCheck = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      console.log(import.meta.env.VITE_BACKEND_URL);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reAuth/verify`,
          {
            withCredentials: true, // Important for sending cookies
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        dispatch(setUser(response.data));
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const location = useLocation();
  console.log(location);
  console.log(isAuthenticated);

  // Redirect authenticated user trying to access login page
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/notes" />;
  }

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthCheck;
