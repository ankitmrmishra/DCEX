"use client";
import { PublicKey } from "@solana/web3.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { TabButton } from "./Button";
import { Swap } from "./Swap";
import { useMediaQuery } from "../api/hooks/useMediaQuery";
import AddFunds from "./AddFunds";
import DashboardSkeleton from "../Dashboard/Skeleton";
import Assets from "./Assets";
import {
  Moon,
  Sun,
  Menu,
  X,
  Wallet,
  Send,
  Plus,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

type Tab = "DashBoard" | "send" | "add_funds" | "swap" | "withdraw";

const tabs: { id: Tab; name: string }[] = [
  { id: "DashBoard", name: "DashBoard" },
  { id: "send", name: "Send" },
  { id: "add_funds", name: "Add funds" },
  { id: "withdraw", name: "Withdraw" },
  { id: "swap", name: "Swap" },
];

const Profile = ({ publicKey }: { publicKey: string }) => {
  const [activetab, setactiveTab] = useState("Tokens");
  const { tokenBalances, loading } = useTokens(publicKey);
  const session = useSession();
  const router = useRouter();
  const breakpoint = useMediaQuery(786);

  if (session.status === "loading") {
    return (
      <div className="text-white flex justify-start items-center align-middle w-full">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
  }

  return (
    <div className="grid grid-cols-5  flex-col lg:flex-row justify-center items-center align-middle p-5 bg-gray-200 rounded-lg gap-4  w-[90%]  mx-auto max-h-max ">
      {/* <div className="name_and_details relative  flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 align-middle p-5 bg-green-400">
        <img
          className="rounded-full border border-white w-16 h-16"
          src={session.data?.user?.image ?? ""}
          alt=""
        />
        <div className="greeting text-center lg:text-left text-2xl">
          <span>Welcome Back, </span>
          <span className="text-blue-600">{session.data?.user?.name}</span>
        </div>
      </div> */}
      <div className=" h-full z-50  bg-black transform transition-transform duration-300 ease-in-out col-span-1 rounded-xl">
        <nav className="p-4 space-y-2">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 m-5 flex-col">
            {tabs.map((tab) => (
              <TabButton
                className="bg-black text-white"
                key={tab.id}
                active={tab.id === activetab}
                onClick={() => {
                  setactiveTab(tab.id);
                }}
              >
                {tab.name}
              </TabButton>
            ))}
          </div>
        </nav>
      </div>
      <div className="col-span-4 ">
        <div
          className={`${
            activetab === "DashBoard" ? "visible" : "hidden"
          } w-full`}
        >
          <Assets
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div
          className={`${activetab === "swap" ? "visible" : "hidden"} w-full`}
        >
          <Swap
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div
          className={`${activetab === "send" ? "visible" : "hidden"} w-full`}
        >
          <ComingSoon />
        </div>
        <div
          className={`${
            activetab === "add_funds" ? "visible" : "hidden"
          } w-full`}
        >
          <AddFunds publicKey={publicKey} />
        </div>
        <div
          className={`${
            activetab === "withdraw" ? "visible" : "hidden"
          } w-full`}
        >
          <ComingSoon />
        </div>
      </div>
    </div>
  );
};

export default Profile;

function ComingSoon() {
  return (
    <div className="text-center text-2xl p-3">
      <span>We are working on this feature, coming soon...</span>
    </div>
  );
}
