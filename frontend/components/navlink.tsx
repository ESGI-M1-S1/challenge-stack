"use client";
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navlink = ({
  className,
  children,
  href,
}: {
  className: string;
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  console.log(pathname, href);
  return (
    <Link href={href ?? ""}>
      <Button
        variant={href === pathname ? "secondary" : "ghost"}
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
};

export default Navlink;
