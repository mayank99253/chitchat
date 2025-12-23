import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimateContainer'
import { LockIcon, MailIcon, MessageCircleIcon, LoaderIcon } from 'lucide-react'
import { Link } from 'react-router'

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { login, isLoggingIn } = useAuthStore()

  const handlesubmit = (e) => {
    e.preventDefault();
    login(formData);
  }
  return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden">
      {/* PREMIUM GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#020617_0%,#1e1b4b_40%,#0ea5e9_100%)]" />

      {/* HALFTONE GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* GLOW BLOBS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/30 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/30 blur-[120px]" />

      {/* ACTUAL CONTENT */}
      <div className="relative z-10 w-full flex justify-center items-center p-4">
        {/* 👇 tumhara existing content yahin rahega */}

        <div className="w-full max-w-4xl">
          <BorderAnimatedContainer>


            <div className='w-full flex flex-col md:flex-row'>
              {/* Form Coloum - Left Side Start*/}
              <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
                <div className='w-full max-w-md'>
                  {/* Heading Text Start */}

                  <div className='text-center mb-8 animate-fade-in'>
                    <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                    <h2 className='text-2xl font-bold text-slate-200 mb-2'>
                      Welcome Back 
                    </h2>
                    <p className='text-slate-400'>
                      Login to access you Account
                    </p>
                  </div>

                  {/*Heading Text Close  */}

                  {/* From Start */}
                  <form onSubmit={handlesubmit} className='space-y-4'>

                    {/* Email Input */}
                    <div>
                      <label className='auth-input-label'>Email</label>
                      <div className='relative'>
                        <MailIcon className='auth-input-icon' />

                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className='input'
                          placeholder='Enter Your Email'
                        />
                      </div>
                    </div>
                    {/* Password Input */}
                    <div>
                      <label className='auth-input-label'>Password</label>
                      <div className='relative'>
                        <LockIcon className='auth-input-icon' />

                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className='input'
                          placeholder='Enter Your Password'
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      className='auth-btn relative overflow-hidden group'
                      type='submit'
                      disabled={isLoggingIn}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-20 transition" />

                      {isLoggingIn ? (
                        <LoaderIcon className='w-full h-5 animate-spin text-center' />
                      ) : (
                        "Sign In "
                      )}
                    </button>

                  </form>

                  <div className='mt-6 text-center'>
                    <Link to="/signup" className="auth-link">
                      Don't have any account? Sign Up
                    </Link>
                  </div>

                </div>

              </div>
              {/* Form Coloum - Right Side Start */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                <div>
                  <img
                    src="/login.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-medium text-cyan-400">Connect Anytime , Anywhere</h3>

                    <div className="mt-4 flex justify-center gap-4">
                      <span className="auth-badge">Free</span>
                      <span className="auth-badge">Easy Setup</span>
                      <span className="auth-badge">Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
