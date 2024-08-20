"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import {
  WalletMultiButton,
  WalletConnectButton,
  WalletIcon,
} from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    const updateButtonStyle = () => {
      if (window.innerWidth < 640) {
        // { this is mobile style}
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
    <div className='flex  top-5 left-[25%]  gap-16 rounded-xl bg-transparent justify-center items-center align-middle p-5 '>
      <div className="flex justify-center items-center align-middle gap-16 p-3 bg-white/20 rounded-xl">
      <span onClick={() => {
                  router.push("/");
                }} className='text-blue-700 lg:text-2xl text-center font-bold hover:cursor-pointer'>
        DXC{" "}
      </span>
      <div className='hidden lg:block'>
        
        
      </div>

      <main className='flex items-center justify-between align-middle gap-3 '>
        <div className='border hover:border-slate-900 rounded bg-white'>
          <WalletMultiButton
            style={buttonStyle}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          />
        </div>

        <div>
          {session.data?.user ? (
            <Button
            disable={false}
              onClick={() => {
                signOut();
              }}>
              Logout
            </Button>
          ) : (
            <Button
            disable={false}
              onClick={() => {
                signIn();
              }}>
              Login
            </Button>
          )}
        </div>
      </main>
      </div>
    </div>
  );
};

export default Navbar;
