"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import {
  WalletMultiButton,
  WalletConnectButton,
  WalletIcon,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const session = useSession();
  return (
    <div className='flex justify-between items-center align-middle p-5  bg-[#19222e]'>
      <span className='text-blue-700 text-2xl text-center font-bold'>
        DesiXchange{" "}
      </span>
      <div className='hidden lg:block'>
        <a href='/' className='text-white no-underline mr-4'>
          Home
        </a>
        <a href='/Features' className='text-[#A0C4FF] no-underline mr-4'>
          Features
        </a>
        <a href='/About' className='text-[#A0C4FF] no-underline mr-4'>
          About
        </a>
        <a href='/Support' className='text-[#A0C4FF] no-underline'>
          Support
        </a>
      </div>

      <main className='flex items-center justify-between align-middle gap-3 '>
        <div className='border hover:border-slate-900 rounded bg-white'>
          <WalletMultiButton
            style={{
              backgroundColor: "lightblue",
              color: "black",
              height: "2.5rem",
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          />
        </div>

        <div>
          {session.data?.user ? (
            <Button
              onClick={() => {
                signOut();
              }}>
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                signIn();
              }}>
              Login
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
