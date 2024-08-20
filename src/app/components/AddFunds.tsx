
import React, { useState, useEffect, useCallback } from "react";
import { FaWallet } from "react-icons/fa6";
import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js';
import Image from "next/image";
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import { AssetSelector } from "./Swap";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { UserBalance } from "../Dashboard/page";
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
    <div className='pt-10'>
      {showOtherComponent ? (
        <DepositThroughWallet
          tokenBalances={tokenBalances}
          loading={loading}
          publicKeyy={publicKey}
          
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
          <div
            className='mt-5 border border-gray-700 p-5 rounded-xl flex align-top items-start gap-3'
            onClick={openModal}>
            <div className='text-2xl'>
              <FaWallet />
            </div>
            <div className='flex flex-col'>
              <span className='font-bold'>To this Solana Wallet Address</span>
              <span className='text-xs text-gray-500'>
                Deposit assets via this Solana wallet address
              </span>
            </div>
            
          </div>
        </div>
      )}
        <QRCodeWalletScanner isOpen={showScannerComponent} onClose={closeModal} publicKey={publicKey}/>
        
    </div>
  );
};

export default AddFunds;




const DepositThroughWallet = ({ tokenBalances, loading, publicKeyy, onClose }:{
  onClose: () => void;
  publicKeyy: string
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
  const [error, setError] = useState(null);
// if(!tokenBalances?.tokens[0].price) return;
// else{
//   setAmountSOL(tokenBalances?.tokens[0].price)
// }
   
   
  //  tokenBalances?.tokens &&
  //   tokenBalances.tokens.map((token) => (
  //     if(asset.name === token.name) setAmountSOL(token.price)
  //   ))
   
  
   

  useEffect(() => {
    // Any side effects you want to run when connected or publicKey changes
  }, [connected, publicKey]);

  const handleAmountChange = useCallback((value:number) => {
    console.log(value);
    
    setAmount(value);
    if(!tokenBalances?.tokens[0].price) return;
    const price = parseFloat(tokenBalances.tokens[0].price);
    setAmountSOL(value / price);
  }, []);

  const sendSol = useCallback(async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!publicKey) {
      // setError("Wallet not connected");
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
      // You might want to add a success message or callback here
    } catch (error) {
      console.error("Error sending transaction:", error);
      // setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  }, [publicKey, connection, sendTransaction, amountSOL, publicKeyy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Deposit via connected wallet</h2>
      {/* <p className='mb-4'>Specify asset and amount:</p>
      <div className='mb-4'>
        <label className='block mb-2'>Asset:</label>
        <div className='flex items-center border rounded-md p-2'>
          <AssetSelector
            onSelect={setAsset}
            selectedToken={asset}
          />
        </div>
      </div>

      <p className='mb-4'>
        Your available {asset.name}:
        {tokenBalances?.tokens &&
          tokenBalances.tokens.map((token, index) => (
            <span key={index}>{asset.name === token.name && token.usdBalance} </span>
          ))}
      </p> */}
      <div className='mb-4'>
        <div className='text-center text-3xl font-bold'>
          ${amount.toFixed(2)} USD
        </div>
        <div className='text-center text-gray-500'>
          ~{amountSOL.toFixed(6)} SOL
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 mb-4'>
        {[1, 2, 5].map((value, index) => (
          <button
            key={index}
            onClick={() => handleAmountChange(value)}
            className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'>
            ${value}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className='flex justify-between'>
        <button
          onClick={onClose}
          className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'>
          Cancel
        </button>
        <button
          onClick={sendSol}
          className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400'
          disabled={amount <= 0 || isProcessing}>
          {isProcessing ? 'Processing...' : 'Confirm Deposit'}
        </button>
      </div>
    </div>
  );
};

