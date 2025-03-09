import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// API for login user
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    
    try {
      // Find user by username
      const user = await User.findOne({userName});
      if (!user) {
        return res.json({ success: false, message: "User does not exist" });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }
  
      // Create token and respond
      const token = createToken(user._id);
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Server error" });
    }
  };
  
  // Token creation function
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
  };
// API to get user Data by username
const getUserData = async (req, res) => {
  try {
    const { userName } = req.body; // Expecting userName in the request body (or use req.user.userName if it's in JWT token)
    const user = await User.findOne({ userName }); // Find by username instead of userId
    if (!user) {
      return res.status(404).json({ success: false, message: "User is not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, getUserData };
