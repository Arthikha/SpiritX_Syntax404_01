import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const getuserName = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      // If the token is valid, fetch the user from the database
      const user = getUserFromDatabase(decoded.userId); // Replace with actual DB query
      if (user) {
        return res.status(200).json({ username: user.username });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    });

}
export default getuserName