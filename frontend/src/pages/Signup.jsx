import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { Route, useNavigate } from "react-router-dom";

const Signup = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailSuccess,setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [userNameSuccess, setUserNameSuccess] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);



  const navigate = useNavigate();

  const { backendURL, setUToken, uToken } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        setError("No token found, please login.");
        return;
      }

      try {
        const response = await axios.get("/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
          },
        });

        if (response.data.success) {
          setUserData(response.data.user); // Assuming the response contains user data
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        setError("Error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userName && userName.length < 8) {
      setUserNameError("Username must be at least 8 characters.");
      setUserNameSuccess("");
    } else if (userName) {
      setUserNameError("");
      setUserNameSuccess("Valid username");
    }
  }, [userName]);

  // Email validation
  useEffect(() => {
    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Enter a valid email address.");
      setEmailSuccess("");
    } else if (email) {
      setEmailError("");
      setEmailSuccess("Valid email address");
    }
  }, [email]);

//   password validation
  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a special character.");
      setPasswordSuccess("");
    } else {
      setPasswordError("");
      setPasswordSuccess("This is a strong password.");
    }
  }, [password]);

  // Confirm Password validation
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      setConfirmPasswordSuccess("");
    } else if (confirmPassword) {
      setConfirmPasswordError("");
      setConfirmPasswordSuccess("Passwords match");
    }
  }, [confirmPassword, password]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendURL + "/api/user/register", {
        userName,
        email,
        password,
        confirmPassword,
      });
      if (data.success) {
        localStorage.setItem("uToken", data.token);
        setUToken(data.token);
        navigate("/login");
        setEmail("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setUserNameSuccess("");
        setConfirmPasswordSuccess("");
        setPasswordSuccess("");
        setEmailSuccess("");
        setPasswordSuccess("");
        setPasswordError("");
        
      } else {
        toast.error(data.message);
        setEmail("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setUserNameSuccess("");
        setConfirmPasswordSuccess("");
        setPasswordSuccess("");
        setEmailSuccess("");
        setPasswordError("");
        
      }
    } catch (error) {
      toast.error(error.message);
      setErrorMessage("Something went wrong. Please try again.");
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
              {userNameError && <p className="text-red-500 text-sm">{userNameError}</p>}
              {userNameSuccess && <p className="text-green-500 text-sm">{userNameSuccess}</p>}
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
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              {emailSuccess && <p className="text-green-500 text-sm">{emailSuccess}</p>}
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
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}
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
              {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
              {confirmPasswordSuccess && <p className="text-green-500 text-sm">{confirmPasswordSuccess}</p>}
            </div>
          </div>
          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md">
              {errorMessage}
            </div>
          )}
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
