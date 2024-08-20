import { QRCode } from "react-qrcode-logo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";

import SolLogo from "../../../public/assets/solana.81812e17.webp";
import Solscan from "../../../public/assets/branding-solscan-logo-light.png";

interface QRCodeWalletScannerProps {
  publicKey: string;
  onClose: () => void;
  isOpen: boolean;
}

function truncateAddress(address: string, startLength = 4, endLength = 4): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}…${address.slice(-endLength)}`;
}

export function QRCodeWalletScanner({ publicKey, onClose, isOpen }: QRCodeWalletScannerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  if (!isOpen) return null;

  const truncatedAddress = truncateAddress(publicKey);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
  };

  const openSolscan = () => {
    window.open(`https://solscan.io/account/${publicKey}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex justify-center items-center align-middle flex-col gap-5 bg-white rounded-xl p-8">
        <div className="flex flex-col justify-center align-middle items-center w-[30rem]">
          <span className="text-3xl font-bold">Your Wallet Address</span>
          <span className="text-gray-400 w-[28rem] text-center">
            You can deposit crypto or NFTs into your account via this Solana wallet address:
          </span>
        </div>

        <div className="flex flex-col justify-center items-center align-middle gap-8 bg-gray-300 p-8 rounded-2xl">
          <QRCode value={publicKey} logoImage={SolLogo.src} size={200} />
          <div className="flex flex-col justify-center items-center align-middle text-center gap-4">
            <div className="walletAddressbox flex justify-between align-middle items-center gap-4">
              <span className="bg-gray-200 px-24 rounded-xl flex justify-center items-center align-middle text-center text-xl py-3">
                {truncatedAddress}
              </span>
              <div className="iconCopy">
                <button
                  onClick={handleCopyClick}
                  className='bg-black p-3 text-white text-xl rounded-xl'
                  type='button'
                >
                  {copied ? <MdDone /> : <IoCopy />}
                </button>
              </div>
            </div>
            <span className="text-xs flex justify-center align-middle items-center gap-2">
              <CiCircleInfo />Only send crypto to this address via the Solana network.
            </span>
          </div>
        </div>

        <div className="flex justify-around align-middle items-center gap-44">
          <button
            className='py-2 px-4 bg-black rounded-md hover:bg-gray-300 flex'
            onClick={openSolscan}
          >
            <Image src={Solscan} width={100} height={100} alt="logoSolscan" />
          </button>
          <button
            onClick={onClose}
            className='py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
