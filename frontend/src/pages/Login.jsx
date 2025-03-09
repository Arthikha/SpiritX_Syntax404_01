import axios from "axios";
import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { backendURL, setUToken } = useContext(userContext);

  // Real-time validation for user inputs
  const validateInput = () => {
    let newErrors = {};
    if (!data.userName.trim()) {
      newErrors.userName = "Username is required.";
    }
    if (!data.password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; // Stop if there are validation errors

    try {
      const { data: response } = await axios.post(
        `${backendURL}/api/user/login`,
        data
      );
      if (response.success) {
        localStorage.setItem("uToken", response.token);
        localStorage.setItem("username", response.username);
        setUToken(response.token);
        navigate("/"); // Redirect to home
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed! Try again.";

      setErrors({}); // Clear previous validation errors

      if (errorMsg.toLowerCase().includes("user does not exist")) {
        setErrors("Username is incorrect.");
      } else if (errorMsg.toLowerCase().includes("incorrect password")) {
        setErrors("Password is incorrect." );
      } else {
        setErrorMessage(errorMsg); // General error message
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <p className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login
        </p>

        {/* General Error Message */}
        {errorMessage || !errors.userName || !errors.password || (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-700"
              >
                Enter Username
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                value={data.userName}
                onChange={onChangeHandler}
                className={`border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.userName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-600"
                  }`}
                />
                {/* Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          {/* General or Field Specific Error Messages */}
          <div className="mb-4">
            {errorMessage && !errors.userName && !errors.password && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
                {errors}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-900 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
