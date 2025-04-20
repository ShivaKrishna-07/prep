"use client";
import React, { Suspense } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { NavLink } from "./NavLink";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

const Navbar: NextPage = () => {
  const navLinks: NavLink[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Chatbot",
      path: "/chatbot",
    },
    {
      name: "Analyze",
      path: "/analyze",
    },
    {
      name: "GitHub",
      path: "https://github.com/ShivaKrishna-07/prep",
      external: true,
    },
  ];

  return (
    <Suspense>
      <nav className="top-0 z-10 sticky border-b border-border mx-auto bg-transparent backdrop-blur-sm">
        <div className="flex justify-between md:justify-around items-center p-5 w-full">
          {/* Logo */}
          <div id="logo-ph">
            <Link
              href="/"
              className="inline-flex h-10 items-center text-foreground rounded-lg font-extrabold text-[2rem]"
            >
              Prep
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-between items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-[1rem]">
              {navLinks.map((navLink) => (
                <li key={navLink.path}>
                  {navLink.external ? (
                    <NavLink
                      href={navLink.path}
                      aria-label="desktop navbar link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={(active) =>
                        active
                          ? "inline-block py-2 px-3 text-center rounded-lg text-foreground"
                          : "inline-block py-2 px-3 text-center text-muted rounded-lg"
                      }
                    >
                      {navLink.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      href={navLink.path}
                      className={(active) =>
                        active
                          ? "inline-block py-2 px-3 text-center font-bold rounded-lg"
                          : "inline-block py-2 px-3 text-center text-muted rounded-lg"
                      }
                    >
                      {navLink.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
          </div>
          <div>
            <ThemeToggle />

          </div>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
