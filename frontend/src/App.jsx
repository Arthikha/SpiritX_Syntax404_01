import React from 'react'
// import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import FinalPage from './pages/FinalPage'
import Signup from './pages/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FinalPage />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/signup" element={<Signup  />} />
    </Routes>
  )
}

export default App