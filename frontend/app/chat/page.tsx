"use client";

import React from "react";
import { Sidebar } from "@/app/chat/sidebar";
import { Chat } from "@/app/chat/components/chat";
import { useRouter, useSearchParams } from "next/navigation";
import { userData } from "@/app/chat/data";

const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get("userId") ?? "2");
  const loggedInUserId = parseInt(searchParams.get("loggedInUserId") ?? "1");
  if (!searchParams) {
    router.replace(`/chat?userId=${userId}&loggedInUserId=${loggedInUserId}`);
  }
  const selectedUser = userData[userId - 1];
  const loggedInUser = userData[loggedInUserId - 1];

  return (
    <div className={"h-full flex"}>
      <Sidebar className="max-w-[25%]" playlists={playlists} />
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
