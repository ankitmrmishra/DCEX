"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
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
    </div>
  );
};

export default Navbar;
