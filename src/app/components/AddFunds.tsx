import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa6";
import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import Image from "next/image";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { AssetSelector } from "./Swap";
import { SUPPORTED_TOKENS } from "@/lib/constants";

const AddFunds = ({ publicKey }: { publicKey: string }) => {
  const { wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const { tokenBalances, loading } = useTokens(publicKey);

  const [showOtherComponent, setShowOtherComponent] = useState(false);

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
    <div className='pt-10'>
      {showOtherComponent ? (
        <DepositThroughWallet
          tokenBalances={tokenBalances}
          loading={loading}
          publickey={publicKey}
          onClose={() => setShowOtherComponent(false)}
        />
      ) : (
        <div className=''>
          <span className='text-2xl font-bold flex flex-col'>
            Deposit from External Account/Wallet
            <span className='text-sm text-gray-500'>
              Select the source to add assets into your TipLink account
            </span>
          </span>
          <div
            className='mt-5 border border-gray-700 p-5 rounded-xl flex align-top items-start gap-3'
            onClick={() => connectWallet({ wallet })}>
            <div className='text-2xl'>
              <FaWallet />
            </div>
            <div className='flex flex-col'>
              <span className='font-bold'>External Wallet</span>
              <span className='text-xs text-gray-500'>
                Deposit assets from your{" "}
                <span className='text-black font-semibold'>
                  {wallet ? wallet?.adapter.name : "connected"}
                </span>{" "}
                wallet
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFunds;

interface DepositThroughWallet {
  onClose: () => void;
  publickey: string;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null;
  loading: boolean;
}

const DepositThroughWallet: React.FC<DepositThroughWallet> = ({
  tokenBalances,
  loading,
  publickey,
  onClose,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [amountSOL, setAmountSOL] = useState<number>(0);
  const { publicKey, connected } = useWallet();
  const [availableSOL, setAvailableSOL] = useState<number>(0);
  const [asset, setAsset] = useState(SUPPORTED_TOKENS[1]);

  useEffect(() => {}, [connected, publicKey]);

  const handleAmountChange = (value: number) => {
    setAmount(value);
    // Convert USD to SOL (this is a placeholder conversion)
    setAmountSOL(value / 20); // Assuming 1 SOL = $20 USD
  };

  const handleConfirmDeposit = () => {
    // Implement deposit logic here
    console.log(`Depositing ${amount} USD (${amountSOL} SOL)`);
  };

  return (
    <div className=' mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Deposit via connected wallet</h2>
      <p className='mb-4'>Specify asset and amount:</p>
      <div className='mb-4'>
        <label className='block mb-2'>Asset:</label>
        <div className='flex items-center border rounded-md p-2'>
          <AssetSelector
            onSelect={(asset) => {
              setAsset(asset);
            }}
            selectedToken={asset}
          />
        </div>
      </div>

      <p className='mb-4'>
        Your available {asset.name}:
        {tokenBalances?.tokens &&
          tokenBalances.tokens.map((token, index) => (
            <span>{asset.name === token.name && token.usdBalance}</span>
          ))}
      </p>
      <div className='mb-4'>
        <div className='text-center text-3xl font-bold'>
          ${amount.toFixed(2)} USD
        </div>
        <div className='text-center text-gray-500'>
          ~{amountSOL.toFixed(6)} SOL
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 mb-4'>
        {[1, 2, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleAmountChange(value)}
            className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'>
            ${value}
          </button>
        ))}
      </div>
      <div className='flex justify-between'>
        <button
          onClick={onClose}
          className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'>
          Cancel
        </button>
        <button
          onClick={handleConfirmDeposit}
          className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          disabled={amount <= 0}>
          Confirm Deposit
        </button>
      </div>
    </div>
  );
};
