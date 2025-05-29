"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import SignUpButton from "./SignUpButton";

const navLinks = [
  { title: "HOME", path: "/" },
  { title: "ABOUT", path: "/about" },
  { title: "SERVICES", path: "/services" },
  { title: "CONTACT", path: "/contact" },
  { title: "AI", path: "/diagnostics" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black border-b border-gray-600 shadow-md bg-opacity-90">

      <div className="container flex flex-wrap items-center justify-between px-4 py-3 mx-auto">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-white">IBILLS</span>{" "}
          <span className="text-red-600">AUTO LANKA</span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 text-white border border-white rounded hover:text-red-500 hover:border-red-500"
          >
            {navbarOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="hidden space-x-6 md:flex md:items-center">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              href={link.path}
              title={link.title}
              className="text-sm font-medium text-white hover:text-red-500"
            />
          ))}

          {/* Sign In / Sign Up Buttons */}
          <SignUpButton/>
        </div>
      </div>

      {navbarOpen && (
        <MenuOverlay links={navLinks}>
          <SignUpButton/>
        </MenuOverlay>
      )}
    </nav>
  );
};

export default Navbar;
