import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { backendURL, setUToken } = useContext(userContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    let newErrors = {};
    if (data.userName && data.userName.length < 8) {
      newErrors.userName = "Username must be at least 8 characters.";
    }
    if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (data.password && !passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a special character.";
    }
    if (data.confirmPassword && data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) return;
    try {
      const { data: response } = await axios.post(`${backendURL}/api/user/register`, data);
      if (response.success) {
        localStorage.setItem("uToken", response.token);
        setUToken(response.token);
        navigate("/login");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      if (error.response?.data?.message?.includes("E11000 duplicate key")) {
        setErrorMessage("This email is already registered. Please use another email.");
      } else if (error.response?.data?.message?.includes("Username already exists")) {
        setErrorMessage("This username is already taken. Please choose another one.");
      } else {
        setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex items-center justify-center my-12 min-h-[80vh]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <p className="text-2xl font-semibold text-center text-gray-800 mb-4">Create Account</p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {Object.entries({
              userName: "Your Username",
              email: "Email",
              password: "Password",
              confirmPassword: "Confirm Password",
            }).map(([key, label]) => (
              <div className="flex flex-col gap-2" key={key}>
                <label htmlFor={key}>{label}</label>
                <div className="relative">
                  <input
                    id={key}
                    type={key.includes("password") && (key === "password" ? showPassword : showConfirmPassword) ? "text" : key.includes("password") ? "password" : "text"}
                    name={key}
                    value={data[key]}
                    onChange={onChangeHandler}
                    className="border p-3 rounded-lg w-full"
                    required
                  />
                  {key.includes("password") && (
                    <span
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => key === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {key === "password" ? showPassword ? <FaEyeSlash /> : <FaEye /> : showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>
                {(key === "userName" && errorMessage.includes("username")) && (
                  <p className="text-red-500 text-sm">This username is already taken. Please choose another one.</p>
                )}
                {(key === "email" && errorMessage.includes("email")) && (
                  <p className="text-red-500 text-sm">This email is already registered. Please use another email.</p>
                )}
                {errors[key] && !errorMessage.includes(key) && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}
          </div>
          {errorMessage && !errorMessage.includes("email") && !errorMessage.includes("username") && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md">{errorMessage}</div>
          )}
          <button type="submit" className="w-full bg-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-300 transition duration-300">
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <span className="text-purple-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
