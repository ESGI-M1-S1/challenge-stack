"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/app/chat/components/chat";
import { useRouter, useSearchParams } from "next/navigation";
import { userData } from "@/app/chat/data";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get("userId") ?? "2");
  const loggedInUserId = parseInt(searchParams.get("loggedInUserId") ?? "1");
  if (!searchParams.has("userId") || !searchParams.has("loggedInUserId")) {
    router.replace(`/chat?userId=${2}&loggedInUserId=${1}`);
  }
  const selectedUser = userData[userId - 1];
  const loggedInUser = userData[loggedInUserId - 1];

  return (
    <div className={"h-full flex"}>
      <Sidebar className="max-w-[25%]" />
      <Chat
        loggedInUser={loggedInUser}
        messages={selectedUser.messages}
        selectedUser={selectedUser}
        isMobile={false}
      />
    </div>
  );
};

export default Page;
