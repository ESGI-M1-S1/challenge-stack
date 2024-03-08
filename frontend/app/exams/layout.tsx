import React, { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"h-full flex"}>
      <Sidebar className="max-w-[25%]" />
      <main className={"w-full p-5"}>{children}</main>
    </div>
  );
};

export default Layout;