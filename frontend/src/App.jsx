import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'


const App = () => {
  const  { authUser , isLoggedIn , login }= useAuthStore()
  console.log('AuthUser', authUser)
  console.log('isloading', isLoggedIn)

  const [dark, setDark] = useState(false);
  return (
    <div className={`min-h-screen relative overflow-hidden flex justify-center items-center transition-colors duration-500
        ${dark
        ? "bg-[linear-gradient(135deg,#020617_0%,#1e1b4b_40%,#0ea5e9_100%)]"
        : "bg-[linear-gradient(135deg,#D946EF_0%,#8B5CF6_35%,#38BDF8_70%,#0EA5E9_100%)]"
      }
      `}
    >
      {/* Halftone dots */}
      <div
        className={`pointer-events-none absolute inset-0
          bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)]
          [background-size:18px_18px]
          ${dark ? "opacity-10" : "opacity-100"}
        `}
      />

      {/* Toggle Button */}
      <button
        onClick={() => setDark(!dark)}
        className="
          absolute top-4 right-4 z-50
          px-4 py-2 rounded-full
          backdrop-blur-md
          bg-white/20 text-white
          border border-white/30
          hover:bg-white/30
          transition
        "
      >
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* App Content */}
      <div className="relative z-10 p-6">
        {/* Your routes / pages here */}

        {/* Example Glass Card */}
        <div className="
          max-w-md mx-auto mt-20
          backdrop-blur-xl
          bg-white/10
          border border-white/20
          rounded-2xl
          p-6 text-white shadow-xl
        ">
          <button onClick={login}> login </button>
          <h1 className="text-2xl font-bold mb-2">ChitChat 💬</h1>
          <Routes>
            <Route path='/' element={<ChatPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
      </div>
      {/* <Routes>
        <Route path='/' element={<ChatPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage/>} />
        </Routes> */}
    </div>
  )
}

export default App
