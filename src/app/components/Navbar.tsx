"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import {
  WalletMultiButton,
  WalletIcon,
} from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [buttonStyle, setButtonStyle] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle the menu visibility

  useEffect(() => {
    const updateButtonStyle = () => {
      if (window.innerWidth < 640) {
        // Mobile style
        setButtonStyle({
          backgroundColor: "lightblue",
          color: "black",
          height: "2rem",
          fontSize: "0.875rem",
          padding: "0.5rem 1rem",
        });
      } else {
        setButtonStyle({
          backgroundColor: "lightblue",
          color: "black",
          height: "2.5rem",
          fontSize: "1rem", // default font size
          padding: "0.5rem 1.5rem",
        });
      }
    };

    updateButtonStyle();

    window.addEventListener('resize', updateButtonStyle);
    return () => window.removeEventListener('resize', updateButtonStyle);
  }, []);

  return (
    <div className="flex top-5 left-[25%] gap-16 rounded-xl bg-transparent justify-center items-center align-middle p-5">
      <div className="flex justify-center items-center align-middle gap-16 p-3 bg-white/20 rounded-xl px-10">
        <span
          onClick={() => {
            router.push("/");
          }}
          className="text-[#ff6e6c] lg:text-2xl text-center font-bold hover:cursor-pointer"
        >
          BharatWallet
        </span>
<div className="flex  justify-center items-center align-middle flex-row-reverse gap-3">
        {/* Burger Menu Button */}
        <div className="lg:hidden ">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white  focus:outline-none"
          >
            {/* Icon for burger menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Wallet Button */}
        <div className="hidden lg:block">
          <WalletMultiButton
            style={buttonStyle}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>

        {/* Burger Menu Content */}
        {isMenuOpen && (
          <div className="absolute top-16 right-5 bg-white p-5 rounded-lg shadow-lg z-50 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              
              <WalletMultiButton
                style={buttonStyle}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
            
            
          </div>
        )}
        <div>
              {session.data?.user ? (
                <Button
                  disable={false}
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false); // Close the menu on logout
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  disable={false}
                  onClick={() => {
                    signIn();
                    setIsMenuOpen(false); // Close the menu on login
                  }}
                >
                  Login
                </Button>
              )}
            </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
