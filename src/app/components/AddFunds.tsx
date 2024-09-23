import React, { useState, useEffect, useCallback } from "react";
import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Wallet as WalletIcon, ExternalLink, QrCode } from "lucide-react";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { QRCodeWalletScanner } from "./QRcodeWallet";

const AddFunds = ({ publicKey }: { publicKey: string }) => {
  const { wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const { tokenBalances, loading } = useTokens(publicKey);

  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [showScannerComponent, setshowScannerComponent] = useState(false);
  const openModal = () => setshowScannerComponent(true);
  const closeModal = () => setshowScannerComponent(false);

  const connectWallet = ({ wallet }: { wallet: Wallet | null }) => {
    if (!wallet) {
      setVisible(true);
    } else {
      setShowOtherComponent(true);
    }
  };

  useEffect(() => {
    setShowOtherComponent(false);
  }, [wallet]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Add Tokens or Funds</CardTitle>
        <CardDescription>Deposit from External Account/Wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showOtherComponent ? (
          <DepositThroughWallet
            tokenBalances={tokenBalances}
            loading={loading}
            publicKeyy={publicKey}
            onClose={() => setShowOtherComponent(false)}
          />
        ) : (
          <>
            <h3 className="text-sm font-medium">
              Select the source to add assets into your BharatWallet account
            </h3>

            <div
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent"
              onClick={() => connectWallet({ wallet })}
            >
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-5 w-5" />
                <div>
                  <p className="font-medium">External Wallet</p>
                  <p className="text-sm text-muted-foreground">
                    Deposit assets from your{" "}
                    {wallet ? wallet?.adapter.name : "connected"} wallet
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent"
              onClick={openModal}
            >
              <div className="flex items-center space-x-3">
                <WalletIcon className="h-5 w-5" />
                <div>
                  <p className="font-medium">To this Solana Wallet Address</p>
                  <p className="text-sm text-muted-foreground">
                    Deposit assets via this Solana wallet address
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <QRCodeWalletScanner
          isOpen={showScannerComponent}
          onClose={closeModal}
          publicKey={publicKey}
        />
      </CardContent>
    </Card>
  );
};

const DepositThroughWallet = ({
  tokenBalances,
  loading,
  publicKeyy,
  onClose,
}: {
  onClose: () => void;
  publicKeyy: string;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null;
  loading: boolean;
}) => {
  const [amount, setAmount] = useState(0);
  const [amountSOL, setAmountSOL] = useState(0);
  const { publicKey, connected, sendTransaction } = useWallet();
  const [asset, setAsset] = useState(SUPPORTED_TOKENS[1]);
  const { connection } = useConnection();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Any side effects you want to run when connected or publicKey changes
  }, [connected, publicKey]);

  const handleAmountChange = useCallback(
    (value: number) => {
      setAmount(value);
      if (!tokenBalances?.tokens[0].price) return;
      const price = parseFloat(tokenBalances.tokens[0].price);
      setAmountSOL(value / price);
    },
    [tokenBalances]
  );

  const sendSol = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      if (!publicKey) {
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const transaction = new web3.Transaction();
        const recipientPubKey = new web3.PublicKey(publicKeyy);
        const lamports = Math.floor(amountSOL * LAMPORTS_PER_SOL);
        const sendSolInstruction = web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: lamports,
        });

        transaction.add(sendSolInstruction);
        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction sent:", signature);
      } catch (error) {
        console.error("Error sending transaction:", error);
        setError((error as Error).message);
      } finally {
        setIsProcessing(false);
      }
    },
    [publicKey, connection, sendTransaction, amountSOL, publicKeyy]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Deposit via connected wallet</h2>
      <div className="text-center">
        <div className="text-3xl font-bold">${amount.toFixed(2)} USD</div>
        <div className="text-gray-500">~{amountSOL.toFixed(6)} SOL</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 5].map((value) => (
          <Button
            key={value}
            variant="outline"
            onClick={() => handleAmountChange(value)}
          >
            ${value}
          </Button>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={sendSol} disabled={amount <= 0 || isProcessing}>
          {isProcessing ? "Processing..." : "Confirm Deposit"}
        </Button>
      </div>
    </div>
  );
};

export default AddFunds;
