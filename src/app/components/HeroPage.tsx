"use client";
import React from "react";
import Image from "next/image";
import LandingImage from "../../../public/assets/995shots_so.png";
import Solanaimg from "../../../public/assets/solanaLogo.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});
const HeroPage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <main className={archivo.className}>
      <div className='bg-black  text-center   max-h-max text-white flex justify-center items-center align-middle lg:p-16 p-6 '>
        <div className='textAreahere  px-5 flex flex-col justify-center items-center align-middle text-center '>
          <span className='lg:text-8xl text-3xl text-white font-bold '>
            Lightning-Fast Trades, Minimal Fees
          </span>{" "}
          <br />
          <span className='lg:text-xl text-sm text-white/45 italic'>
            Trade crypto securely and efficiently on our decentralized platform.
          </span>
          <div className='pt-4'>
            Powered By
            <Image width={500} height={100} src={Solanaimg} alt='' />
          </div>
          <div className='pt-8'>
            {session.data?.user ? (
              <Button
              disable={false}
                onClick={() => {
                  router.push("/Dashboard");
                }}>
                Go To Dashboard
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
        </div>
      </div>
    </main>
  );
};

export default HeroPage;
