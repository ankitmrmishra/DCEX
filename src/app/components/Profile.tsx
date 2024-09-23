"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTokens } from "../api/hooks/useTokens";
import { TabButton } from "./Button";
import { Swap } from "./Swap";
import { useMediaQuery } from "../api/hooks/useMediaQuery";
import AddFunds from "./AddFunds";
import DashboardSkeleton from "../Dashboard/Skeleton";
import Assets from "./Assets";
import {
  Menu,
  X,
  Wallet,
  Send,
  Plus,
  LogOut,
  ChevronRight,
} from "lucide-react";

type Tab = "DashBoard" | "send" | "add_funds" | "swap" | "withdraw";

const tabs: { id: Tab; name: string; icon: React.ReactNode }[] = [
  { id: "DashBoard", name: "DashBoard", icon: <Wallet className="w-5 h-5" /> },
  { id: "send", name: "Send", icon: <Send className="w-5 h-5" /> },
  { id: "add_funds", name: "Add funds", icon: <Plus className="w-5 h-5" /> },
  { id: "withdraw", name: "Withdraw", icon: <LogOut className="w-5 h-5" /> },
  { id: "swap", name: "Swap", icon: <ChevronRight className="w-5 h-5" /> },
];

const Profile = ({ publicKey }: { publicKey: string }) => {
  const [activetab, setactiveTab] = useState<Tab>("DashBoard");
  const { tokenBalances, loading } = useTokens(publicKey);
  const session = useSession();
  console.log(session);

  const router = useRouter();
  const isLargeScreen = useMediaQuery(786);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (session.status === "loading") {
    return (
      <div className="text-white flex justify-start items-center align-middle w-full">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden max-w-7xl mx-auto p-4">
      {/* Sidebar Toggle Button (visible on small screens) */}
      <button
        className="md:hidden p-4 bg-black text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-black text-white w-full md:w-64 p-4 transition-all duration-300 ease-in-out `}
      >
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={tab.id === activetab}
              onClick={() => {
                setactiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className="flex items-center w-full p-2 rounded-lg hover:bg-[#F5E876] transition-colors"
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
            </TabButton>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className={`${activetab === "DashBoard" ? "block" : "hidden"}`}>
          <Assets
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "swap" ? "block" : "hidden"}`}>
          <Swap
            tokenBalances={tokenBalances}
            loading={loading}
            publicKey={publicKey}
          />
        </div>
        <div className={`${activetab === "send" ? "block" : "hidden"}`}>
          <ComingSoon />
        </div>
        <div className={`${activetab === "add_funds" ? "block" : "hidden"}`}>
          <AddFunds publicKey={publicKey} />
        </div>
        <div className={`${activetab === "withdraw" ? "block" : "hidden"}`}>
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
