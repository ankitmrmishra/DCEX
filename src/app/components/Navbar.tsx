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
    <div className='flex  top-5 left-[25%]  gap-16 rounded-xl bg-transparent justify-center items-center align-middle p-5 '>
      <div className="flex justify-center items-center align-middle gap-16 p-3 bg-white/20 rounded-xl">
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
