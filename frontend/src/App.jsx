import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import PageLoader from './components/PageLoader'
import {Toaster} from 'react-hot-toast'

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="h-screen bg-slate-900 relative flex items-center justify-center overflow-hidden">
      {/* DECORATORS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        </Routes>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>

  );
}
export default App;





{/*
  <div className={`min-h-screen relative overflow-hidden flex justify-center items-center transition-colors duration-500
        ${dark
        ? "bg-[linear-gradient(135deg,#020617_0%,#1e1b4b_40%,#0ea5e9_100%)]"
        : "bg-[linear-gradient(135deg,#D946EF_0%,#8B5CF6_35%,#38BDF8_70%,#0EA5E9_100%)]"
      }
      `}
    >
       Halftone dots
      <div
        className={`pointer-events-none absolute inset-0
          bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)]
          [background-size:18px_18px]
          ${dark ? "opacity-10" : "opacity-100"}
        `}
      />

      Toggle Button 
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

      App Content
      <div className="relative z-10 p-6">
        {/* Your routes / pages here 
 {/* <h1 className="text-2xl font-bold mb-2">ChitChat 💬</h1> */}
{/* Example Glass Card 
        <div className="
          max-w-md mx-auto mt-20
          backdrop-blur-xl
          bg-white/10
          border border-white/20
          rounded-2xl
          p-6 text-white shadow-xl
        "></div>
  
  
  
  <Routes>
  <Route path='/' element={<ChatPage />} />
  <Route path='/signup' element={<SignUpPage />} />
  <Route path='/login' element={<LoginPage/>} />
  </Routes> 
  */}