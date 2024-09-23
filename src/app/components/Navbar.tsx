"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { SiSolana } from "react-icons/si";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";
import {
  AppWindow,
  ArrowBigRight,
  ArrowRight,
  Cable,
  ExternalLink,
  LogOut,
  Sparkle,
  Wallet,
} from "lucide-react";
import Image from "next/image";

// import '@dialectlabs/blinks/index.css';
// import { Action, Blink, ActionsRegistry, useAction } from "@dialectlabs/blinks";
// import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana"

const Navbar = () => {
  const router = useRouter();
  const [buttonStyle, setButtonStyle] = useState({});

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
    <div className="flex top-5 left-[25%] gap-16 rounded-xl bg-transparent md:justify-around  md:items-center items-start justify-start align-middle p-5   w-full ">
      <div className="flex justify-center items-center align-middle gap-16 p-3  rounded-xl">
        <span
          onClick={() => {
            router.push("/");
          }}
          className="text-[#F5E876] lg:text-2xl text-3xl text-center font-bold hover:cursor-pointer"
        >
          BharatWallet
        </span>
      </div>
      <div className="ml-[40rem]">
        <div className="hidden lg:block">
          <WalletMultiButton
            style={buttonStyle}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const Sidebar = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();

  const [copied, setCopied] = useState(false);
  const router = useRouter();
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
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);
  return (
    <Sheet>
      <SheetTrigger className=" p-2 rounded-xl px-4 font-semibold ">
        <AppWindow className="text-[#F5E876]" />
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader>
          <SheetTitle className="p-5 md:flex justify-start items-center align-middle text-start gap-2  ">
            Hey <span className="">{session.data?.user?.name}</span>
            <Image
              src={session.data?.user?.image ?? " "}
              height={40}
              width={40}
              alt="userImage"
              className="rounded-full "
            />
          </SheetTitle>
          <SheetDescription>
            <div className="flex  justify-center align-middle items-center gap-3 py-2">
              <div className="wallet_address">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    setCopied(true);
                  }}
                  className="bg-black text-white text-xs md:text-base p-3 rounded-xl w-full lg:w-auto"
                  type="button"
                >
                  {copied ? "Copied" : "Wallet Address"}
                </button>
              </div>
              <div className="crowdfunding ">
                <div className=" lg:flex justify-center items-center align-middle">
                  <button
                    onClick={handleCrowdfunding}
                    className="bg-black text-white p-3 rounded-xl w-full lg:w-auto flex justify-center align-middle items-center gap-4 text-xs md:text-base"
                  >
                    CrowdFunding <SiSolana />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:hidden mb-3">
              <WalletMultiButton
                style={{
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid black",
                  color: "black",
                  fontSize: "15px",
                  width: "15rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-3 "></div>
            <div className="products py-10 px-5">
              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-black/80 bg-black ">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-5 w-5 text-white" />
                  <div className="text-start">
                    <p className="font-medium text-white">Bharat Wallet</p>
                    <p className="text-sm text-white/45">
                      Wallet from India to the world!
                    </p>
                  </div>
                  <ArrowRight />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-black/80 bg-black ">
                <div className="flex items-center space-x-3">
                  <Sparkle className="text-[#F5E876] h-5 w-5" />
                  <div className="text-start">
                    <p className="font-medium text-[#F5E876]  flex justify-start items-start align-middle gap-2">
                      Bharat Wallet Pro
                    </p>
                    <p className="text-sm text-white/65">
                      Transaction at the speed of the light
                    </p>
                  </div>
                  <ArrowRight className="text-white " />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-black/80 bg-black ">
                <div className="flex items-center space-x-3">
                  <Cable className="text-white h-5 w-5" />
                  <div className="text-start">
                    <p className="font-medium text-white flex justify-start items-start align-middle gap-2 text-xs">
                      Bharat Wallet Adapter
                    </p>
                    <p className="md:text-sm text-xs text-white/45">
                      Integrate BharatWallet into your app
                    </p>
                  </div>
                  <ArrowRight />
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-3 "></div>

            <div className="logout">
              <Button
                className="flex justify-center align-middle items-center gap-3"
                disable={false}
                onClick={() => {
                  signOut();
                }}
              >
                Logout <LogOut />
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
