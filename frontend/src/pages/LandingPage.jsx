import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LandingPage = () => {
  const { setUToken } = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { backendURL, uToken } = useContext(userContext);  // Ensure uToken is being retrieved from context

  const fetchUser = async () => {
    try {
      // Ensure the token is correctly prefixed with "Bearer"
      const { data } = await axios.get(`${backendURL}/api/user/get-user-data`, {
        headers: {
          Authorization: `Bearer ${uToken}`, // Add space after Bearer
        },
      });

      if (data.success) {
        setUser(data.user);
      } else {
        toast.error("Error in fetching user");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
      console.error(error);
    }
  };

  useEffect(() => {
    // Ensure user is redirected to login if no uToken is found
    if (!localStorage.getItem("uToken")) {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, [uToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("uToken");
    localStorage.removeItem("username");
    setUToken(null);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hello, {user ? user.userName : "User"}! 🎉
        </h1>
        <p className="text-gray-600 mt-2">Welcome to SecureConnect!</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
