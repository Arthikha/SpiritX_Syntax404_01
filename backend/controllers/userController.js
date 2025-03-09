import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    try {
        const {  userName, email, password, confirmPassword } = req.body;

        if (!userName || !password || !confirmPassword|| !email) {
            return res.json({ success: false, message: "Please enter details" });
        }
        if(password != confirmPassword){
            return res.json({sucess:false,message:"Enter correct password"})
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter 8-digit password" });
        }

        // Check if the username already exists
        const existingUser = await userModel.findOne({ userName });
        const existingEmail = await userModel.findOne({ email });
        
        if (existingUser && existingEmail) {
            return res.json({ success: false, message: "Username and Email already taken, choose a different one" });
        }
        
        

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            
            userName,
            email,
            password: hashPassword,
            confirmPassword: hashPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



// API to get user Data
const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export { registerUser,  getUserData }