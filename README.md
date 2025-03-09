# Project1SpiritX-SecureConnect

**SecureConnect** is a secure and user-friendly authentication system designed to provide a smooth login and signup experience. The system ensures proper validation, error handling, and session management to keep users authenticated until they log out.

## 🌟 Features
- ✅ **User Signup** – Create an account with a unique username and strong password.
- ✅ **User Login** – Securely log in and be greeted with a personalized welcome message.
- ✅ **Session Management** – Users stay logged in until they click "Logout".
- ✅ **Authentication Handling** – Users are automatically redirected to the login page if not authenticated.
- ✅ **Password Security** – Uses bcrypt hashing to securely store passwords.
- ✅ **JWT Token-Based Authentication** – Ensures secure API communication.

## ⚙️ How It Works
1️⃣ **Signup** – Users create an account with a valid username, email, and password.  
2️⃣ **Login** – On successful login, a JWT token is stored in `localStorage` to maintain the session.  
3️⃣ **Landing Page** – Users are welcomed with their username and have the option to log out.  
4️⃣ **Logout** – Clicking "Logout" removes the token and redirects the user to the login page.

## 🛠 Technologies Used
- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcrypt
