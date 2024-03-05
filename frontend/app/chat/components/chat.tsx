import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import { Message, UserData } from "@/app/chat/data";
import { io } from "socket.io-client";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  loggedInUser: UserData;
  isMobile: boolean;
}

export function Chat({
  loggedInUser,
  messages,
  selectedUser,
  isMobile,
}: ChatProps) {
  const [messagesState, setMessages] = useState<Message[]>(messages ?? []);

  const sendMessage = (newMessage: Message) => {
    socket.emit("chat message", newMessage);
    setMessages([...messagesState, newMessage]);
  };

  const socket = io("http://localhost:3001"); // Replace with your server URL

  useEffect(() => {
    socket.on("chat message", (message) => {
      if (
        messagesState[messagesState.length - 1]?.message === message.message
      ) {
        console.log("Duplicate message received");
      } else {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        loggedInUser={loggedInUser}
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
