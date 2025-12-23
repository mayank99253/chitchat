import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const { logout} = useAuthStore()
  return (
    <div >
      <h1>Chat Page </h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage
