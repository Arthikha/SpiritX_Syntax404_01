import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { Route, useNavigate } from "react-router-dom";

const Signup = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { backendURL, setUToken, uToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
        const { data } = await axios.post(backendURL + "/api/user/register", {
          
          userName,
          email,
          password,
          confirmPassword
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/login");
          setEmail("");
          setUserName("");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error(data.message);
          setEmail("");
          setUserName("");
          setPassword("");
          setConfirmPassword("");
        }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-12 min-h-[80vh]">
      
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg ">
          <p className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Create Account
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-gray-700"
                >
                  Your Username
                </label>
                <input
                  id="userName"
                  type="text"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-300 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
    
    </div>
  );
};

export default Signup;