"use client";
import { PublicKey } from "@solana/web3.js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { TabButton } from "./Button";
import { Swap } from "./Swap";
import { useMediaQuery } from "../api/hooks/useMediaQuery";

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
        Welcome to ANKDCEX, We are preparing your DashBoard
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
  }

  return (
    <div
      className='  flex justify-center items-center
     align-middle p-5  bg-white rounded-lg gap-4 max-w-max'>
      <div className='flex flex-col'>
        <div className='name_and_detials flex items-center justify-center gap-3 align-middle p-5 '>
          <img
            className='rounded-full border border-white'
            src={session.data?.user?.image ?? ""}
            alt=''
          />
          <div className='greeting  text-2xl'>
            <span>Welcome Back, </span>
            <span className='text-blue-600'>{session.data?.user?.name}</span>
          </div>
          <div className='account_balance'></div>
        </div>
        <div className='flex justify-center gap-2 m-5'>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={tab.id === activetab}
              onClick={() => {
                setactiveTab(tab.id);
              }}>
              {tab.name}
            </TabButton>
          ))}
        </div>
        <div className={`${activetab === "Tokens" ? "visible" : "hidden"}`}>
          <Assets
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "swap" ? "visible" : "hidden"}`}>
          <Swap
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "send" ? "visible" : "hidden"}`}>
          <ComingSoon />
        </div>
        <div className={`${activetab === "add_funds" ? "visible" : "hidden"}`}>
          <ComingSoon />
        </div>
        <div className={`${activetab === "withdraw" ? "visible" : "hidden"}`}>
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
    <div className=''>
      <div className='text-sm text-white flex justify-center gap-28 align-middle items-center '>
        <div className='text-black flex flex-col'>
          <span className='text-sm text-gray-500'>Current balance</span>
          <span className='text-6xl font-bold'>
            ${tokenBalances?.totalBalance}
            <span className='text-xl  text-gray-400'>USD</span>
          </span>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(publicKey);
            setCopied(true);
          }}
          className='bg-black p-3 rounded-xl'
          type='button'>
          {copied ? "Copied" : "Your Wallet Address"}
        </button>
      </div>
      {/* {JSON.stringify(tokenBalances?.tokens)} */}
      <div className='bg-gray-100 p-5  mt-5 rounded-lg shadow-black/45 shadow-lg'>
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
      <div className='flex gap-2'>
        <div className='  flex justify-center align-middle items-center'>
          <img
            className=' object-cover w-10 h-10 rounded-full bg-gray-100'
            src={imageLink}
            alt=''
          />
        </div>

        <div className=''>
          <span className='text-lg flex flex-col'>
            {name}
            <span className='text-sm text-gray-500'>
              1 {name} = ${price}
            </span>
          </span>
        </div>
      </div>
      <div className='flex flex-col justify-end align-middle items-end '>
        <span className='font-bold'>${balance}</span>
        <span className='text-sm text-gray-500'>
          {currentHolding}
          <span> {name}</span>
        </span>
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className='text-center text-2xl p-3'>
      <span>We are Working on this feature, coming soon...</span>
    </div>
  );
}
