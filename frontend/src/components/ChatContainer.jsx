import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { ChatHeader } from './ChatHeader'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder'
import { MessageInput } from './MessageInput'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton'

export const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subcribeToMessage, unsubcribeToMessage } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);

    subcribeToMessage()

    //clean up
    return () => unsubcribeToMessage()

  }, [selectedUser, getMessagesByUserId, subcribeToMessage, unsubcribeToMessage])

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      {/* MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble max-w-xs md:max-w-md
                  backdrop-blur-lg border border-white/10 shadow-md
                  ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-500/20 text-cyan-100"
                      : "bg-white/10 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      className="rounded-xl h-48 object-cover"
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  <p className="text-[10px] opacity-60 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      {/* INPUT – FIXED HEIGHT */}
      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};