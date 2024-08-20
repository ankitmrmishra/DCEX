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

type Tab = "Tokens" | "send" | "add_funds" | "swap" | "withdraw";

const tabs: { id: Tab; name: string }[] = [
  { id: "Tokens", name: "Tokens" },
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
      <div className='text-white flex justify-start items-center align-middle w-full'>
        <DashboardSkeleton />
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
  }

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center align-middle p-2 bg-white rounded-lg gap-4  max-w-4xl mx-auto'>
      <div className='flex flex-col items-center lg:items-start'>
        <div className='name_and_details flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 align-middle p-5'>
          <img
            className='rounded-full border border-white w-16 h-16'
            src={session.data?.user?.image ?? ""}
            alt=''
          />
          <div className='greeting text-center lg:text-left text-2xl'>
            <span>Welcome Back, </span>
            <span className='text-blue-600'>{session.data?.user?.name}</span>
          </div>
        </div>
        <div className='flex flex-wrap justify-center lg:justify-start gap-2 m-5'>
          {tabs.map((tab) => (
            <TabButton
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
        <div className={`${activetab === "Tokens" ? "visible" : "hidden"} w-full`}>
          <Assets
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "swap" ? "visible" : "hidden"} w-full`}>
          <Swap
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "send" ? "visible" : "hidden"} w-full`}>
          <ComingSoon />
        </div>
        <div className={`${activetab === "add_funds" ? "visible" : "hidden"} w-full`}>
          <AddFunds publicKey={publicKey} />
        </div>
        <div className={`${activetab === "withdraw" ? "visible" : "hidden"} w-full`}>
          <ComingSoon />
        </div>
      </div>
    </div>
  );
};

export default Profile;

function Assets({
  publicKey,
  tokenBalances,
  loading,
}: {
  publicKey: string;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);

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

  console.log(tokenBalances?.totalBalance, "this is token balance ");

  if (loading) {
    return "loading.....";
  }

  return (
    <div className='w-full'>
      <div className='text-sm text-black flex flex-col lg:flex-row justify-center lg:justify-between align-middle items-center gap-4'>
        <div className='flex flex-col text-center lg:text-left'>
          <span className='text-sm text-gray-500'>Current balance</span>
          <span className='text-6xl font-bold'>
            ${tokenBalances?.totalBalance}
            <span className='text-xl text-gray-400'>USD</span>
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(publicKey);
            setCopied(true);
          }}
          className='bg-black text-white p-3 rounded-xl w-full lg:w-auto'
          type='button'
        >
          {copied ? "Copied" : "Your Wallet Address"}
        </button>
      </div>
      <div className='bg-gray-100 p-5 mt-5 rounded-lg shadow-black/45 shadow-lg'>
        {tokenBalances?.tokens &&
          tokenBalances.tokens.map((token, index) => (
            <TableRepresnation
              key={index}
              imageLink={token.image}
              price={token.price}
              currentHolding={token.balance}
              name={token.name}
              balance={token.usdBalance}
            />
          ))}
      </div>
    </div>
  );
}

function TableRepresnation({
  imageLink,
  price,
  currentHolding,
name,
balance,
}: {
  imageLink: string;
  price: string;
  currentHolding: string;
  name: string;
  balance: string;
}) {
  return (
    <div className='flex justify-between align-middle items-center mt-4'>
      <div className='flex gap-2 items-center'>
        <img
          className='object-cover w-10 h-10 rounded-full bg-gray-100'
          src={imageLink}
          alt=''
        />
        <div className='text-lg'>
          {name}
          <span className='text-sm text-gray-500 block'>
            1 {name} = ${price}
          </span>
        </div>
      </div>
      <div className='flex flex-col justify-end items-end text-right'>
        <span className='font-bold'>${balance}</span>
        <span className='text-sm text-gray-500'>
          {currentHolding} {name}
        </span>
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className='text-center text-2xl p-3'>
      <span>We are working on this feature, coming soon...</span>
    </div>
  );
}
