import React from 'react'
import { useChatStore } from '../store/useChatStore'
import  ActiveTabSwitch  from '../components/ActiveTabSwitch'
import { ChatContainer } from '../components/ChatContainer'
import  NoConversationPlaceholder  from '../components/NoConversationPlaceholder'
import Chatslist from '../components/Chatslist'
import { ContactList } from '../components/ContactList'
import BorderAnimatedContainer from '../components/BorderAnimateContainer'
import ProfileHeader from '../components/ProfileHeader'

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore()
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
          <BorderAnimatedContainer className="h-[520px] md:h-[560px]">

            {/* LEFT SIDE */}
            <div className='w-72 h-full bg-slate-800 backdrop-blur-sm flex flex-col p-2 '>
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className='flex-1 overflow-auto p-4 space-y-2'>
                {activeTab === "chats" ? <Chatslist /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className='h-full flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </BorderAnimatedContainer>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
