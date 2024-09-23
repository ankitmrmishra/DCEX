import { useState, useEffect } from "react";
import { TokenWithBalance } from "../api/hooks/useTokens";
import { Card, CardContent } from "./ui/card";
import { ChevronRight, Plus, Send } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";

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
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full grid grid-cols-1 col-span-1">
        <div className="text-sm text-black flex flex-col lg:flex-row justify-center lg:justify-between align-middle items-center gap-4 bg-white p-5 rounded-xl border-2 border-gray-300">
          <div className="flex flex-col text-center lg:text-left">
            <span className="text-sm text-gray-500">Current balance</span>
            <span className="text-6xl font-bold">
              ${tokenBalances?.totalBalance}
              <span className="text-xl text-gray-400">USD</span>
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
            }}
            className="bg-black text-white p-3 rounded-xl w-full lg:w-auto"
            type="button"
          >
            {copied ? "Copied" : "Your Wallet Address"}
          </button>
        </div>
        <Tabs defaultValue="Tokens" className="w-full ">
          <TabsList className="bg-white text-black mt-5">
            <TabsTrigger value="Tokens">Tokens</TabsTrigger>
            <TabsTrigger value="Collectibles">Collectibles</TabsTrigger>
          </TabsList>
          <TabsContent value="Tokens">
            <div className="bg-gray-100 p-5 mt-5 rounded-lg  shadow-lg col-span-2">
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
          </TabsContent>
          <TabsContent value="Collectibles">
            No Collectibles are presemt right now{" "}
          </TabsContent>
        </Tabs>
      </div>
      <div className="col-span-1 ">
        <RecentActivities />
      </div>
    </div>
  );
}

export default Assets;

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
    <div className="flex justify-between align-middle items-center mt-4">
      <div className="flex gap-2 items-center">
        <img
          className="object-cover w-10 h-10 rounded-full bg-gray-100"
          src={imageLink}
          alt=""
        />
        <div className="text-lg">
          {name}
          <span className="text-sm text-gray-500 block">
            1 {name} = ${price}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end text-right">
        <span className="font-bold">${balance}</span>
        <span className="text-sm text-gray-500">
          {currentHolding} {name}
        </span>
      </div>
    </div>
  );
}

const RecentActivities = () => {
  return (
    <Card className="overflow-hidden bg-white text-black border-2 border-gray-300 dark:border-gray-700 max-h-max">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {[
            {
              type: "Received",
              amount: "0.1337 SOL",
              value: "$2,674.00",
              from: "0x1234...5678",
              time: "2 hours ago",
            },
            {
              type: "Sent",
              amount: "22.5 USDC",
              value: "$8,910.75",
              to: "0x8765...4321",
              time: "1 day ago",
            },
            {
              type: "Swapped",
              amount: "1000 USDC to 5.5 SOL",
              value: "$2,178.00",
              time: "3 days ago",
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg bg-gray-50 "
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "Received"
                    ? "bg-green-500"
                    : transaction.type === "Sent"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              >
                {transaction.type === "Received" && (
                  <Plus className="w-6 h-6 text-white" />
                )}
                {transaction.type === "Sent" && (
                  <Send className="w-6 h-6 text-white" />
                )}
                {transaction.type === "Swapped" && (
                  <ChevronRight className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium">{transaction.type}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {transaction.from
                    ? `From: ${transaction.from}`
                    : transaction.to
                    ? `To: ${transaction.to}`
                    : "Internal"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{transaction.amount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {transaction.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {transaction.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
