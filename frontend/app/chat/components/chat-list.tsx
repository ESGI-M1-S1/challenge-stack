import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Message, UserData } from "@/app/chat/data";

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  loggedInUser: UserData;
  isMobile: boolean;
}

export function ChatList({
  loggedInUser,
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name !== selectedUser.name
                  ? "items-end"
                  : "items-start",
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name === selectedUser.name && (
                  <div className="flex justify-center items-center">
                    <Image
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </div>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <div className="flex justify-center items-center">
                    <Image
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar
        loggedInUser={loggedInUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
