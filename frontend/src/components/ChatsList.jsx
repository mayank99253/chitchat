import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatsFound from './NochatsFound';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

function Chatslist() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore()

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />
  if (chats.length === 0) return <NoChatsFound />

  return (
    <>
      {chats.map((chat)=>(
        <div 
        key={chat._id}
        className='bg-cyan-500/10 p-2 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
        onClick={()=>setSelectedUser(chat)}
        >
          <div className='flex items-center gap-3'>
            {/* TODO - FIX IT MAKE IT ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
            <div className={`avatar online`}>
              <div className='size-10 rounded-full'>
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}
export default Chatslist
