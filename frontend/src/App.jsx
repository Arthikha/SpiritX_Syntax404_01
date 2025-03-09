import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

import FinalPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
     {/* ToastContainer to render the toasts */}
     <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Routes>
        <Route path="/" element={<FinalPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
     
    </>
  );
}

export default App;
