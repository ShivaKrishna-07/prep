"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { RiRobot2Fill } from "react-icons/ri";
import { BiSolidAnalyse } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactElement;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/", icon: <FaHouse size={24} /> },
  { label: "Chatbot", href: "/chatbot", icon: <RiRobot2Fill size={24} /> },
  { label: "Analyze", href: "/analyze", icon: <BiSolidAnalyse size={24} /> },
  { label: "Profile", href: "/profile", icon: <FaUserAlt size={22} /> },
];

export default function MobileMenuBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-background/30 backdrop-blur-md text-foreground flex justify-around border-t border-border items-center z-50 pt-3 pb-1">
      {menuItems.map(({ label, href, icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 w-[60px]">
            {React.cloneElement(icon, {
              className: isActive ? "text-primary" : "text-foreground",
            })}
            <span
              className={`text-xs transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
