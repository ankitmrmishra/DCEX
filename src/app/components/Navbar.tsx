"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { SiSolana } from "react-icons/si";
import { useWallet } from "@solana/wallet-adapter-react";
// import '@dialectlabs/blinks/index.css';
// import { Action, Blink, ActionsRegistry, useAction } from "@dialectlabs/blinks";
// import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana"

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [buttonStyle, setButtonStyle] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle the menu visibility

  const handleCrowdfunding = async () => {
    try {
      const response = await fetch(`/api/donate?to=`);
      const data = await response.json();

      if (data.links && data.links.actions) {
        // For simplicity, we'll use the first action (Send 1 SOL)
        const firstAction = data.links.actions[0];
        router.push(firstAction.href);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching crowdfunding data:", error);
    }
  };

  useEffect(() => {
    const updateButtonStyle = () => {
      if (window.innerWidth < 640) {
        // Mobile style
        setButtonStyle({
          backgroundColor: "lightblue",
          color: "black",
          height: "2.5rem",
          fontSize: "1rem",
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

    window.addEventListener("resize", updateButtonStyle);
    return () => window.removeEventListener("resize", updateButtonStyle);
  }, []);

  return (
    <div className="flex top-5 left-[25%] gap-16 rounded-xl bg-transparent justify-center items-center align-middle p-5">
      <div className="flex justify-center items-center align-middle gap-16 p-3 bg-white/20 rounded-xl px-10">
        <span
          onClick={() => {
            router.push("/");
          }}
          className="text-[#F5E876] lg:text-2xl text-center font-bold hover:cursor-pointer"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded"
            />
          </div>
          <div className="hidden lg:flex justify-center items-center align-middle">
            <div
              onClick={handleCrowdfunding}
              className="bg-white flex justify-center items-center align-middle gap-2  hover:bg-white/85 hover:cursor-pointer text-black font-bold  px-4 py-2 rounded"
            >
              CrowdFunding <SiSolana />
            </div>
          </div>

          {/* Burger Menu Content */}
          {isMenuOpen && (
            <div className="absolute top-20 right-1 py-16 flex justify-center gap-2 items-start h-[20rem] align-middle  w-full bg-black text-white p-2 rounded-lg shadow-lg z-50 lg:hidden">
              <div className="">
                <WalletMultiButton
                  style={buttonStyle}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                />
              </div>
              <div className=" lg:flex justify-center items-center align-middle">
                <div
                  onClick={handleCrowdfunding}
                  className="bg-white flex justify-center items-center align-middle gap-2  hover:bg-white/85 hover:cursor-pointer text-black font-bold  px-4 py-2 rounded"
                >
                  CrowdFunding <SiSolana />
                </div>
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
