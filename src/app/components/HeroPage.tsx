"use client";
import React from "react";
import Image from "next/image";
import LandingImage from "../../../public/assets/995shots_so.png";
import Solanaimg from "../../../public/assets/solanaLogo.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";
import TrustedByCompanies from "./ui/TrustedBy";
import { cn } from "@/lib/utils";

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});
const HeroPage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <main className={cn(archivo.className)}>
      <div className="bg-background dark text-foreground text-center   max-h-max text- flex justify-center items-center align-middle  p-6  md:p-28 ">
        <div className="textAreahere  px-48 flex flex-col justify-center items-center align-middle text-center py-16">
          <span className="lg:text-7xl text-3xl text-white font-bold ">
            Unlock Your Crypto Future with{" "}
            <span className="text-[#F5E876]">BharatWallet</span>
          </span>{" "}
          <br />
          <span className="lg:text-xl text-sm text-[#969696] italic">
            Create a fortified, private crypto wallet in moments with our
            intuitive generator. Experience effortless security and peace of
            mind, enhanced by Google Auth for your convenience.
          </span>
          <div className="pt-8">
            {session.data?.user ? (
              <Button
                disable={false}
                onClick={() => {
                  router.push("/Dashboard");
                }}
                className="bg-white"
              >
                Go To Dashboard
              </Button>
            ) : (
              <Button
                disable={false}
                onClick={() => {
                  signIn();
                }}
                className=""
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <section className="flex justify-center align-middle items-center py-5 ">
        <TrustedByCompanies />
      </section>
    </main>
  );
};

export default HeroPage;
