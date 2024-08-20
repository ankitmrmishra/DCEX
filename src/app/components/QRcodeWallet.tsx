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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col gap-5 bg-white rounded-xl p-6 md:p-8 max-w-lg w-full">
        <div className="flex flex-col justify-center items-center text-center">
          <span className="text-xl md:text-3xl font-bold">Your Wallet Address</span>
          <span className="text-gray-400 text-sm md:text-base w-full">
            You can deposit crypto or NFTs into your account via this Solana wallet address:
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 bg-gray-300 p-4 md:p-8 rounded-2xl">
          <QRCode value={publicKey} logoImage={SolLogo.src} size={150} />
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <div className="walletAddressbox flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="bg-gray-200 px-6 md:px-24 rounded-xl text-center text-lg md:text-xl py-2 md:py-3">
                {truncatedAddress}
              </span>
              <button
                onClick={handleCopyClick}
                className="bg-black p-2 md:p-3 text-white text-lg md:text-xl rounded-xl"
                type="button"
              >
                {copied ? <MdDone /> : <IoCopy />}
              </button>
            </div>
            <span className="text-xs md:text-sm flex justify-center items-center gap-2">
              <CiCircleInfo /> Only send crypto to this address via the Solana network.
            </span>
          </div>
        </div>

        <div className="flex justify-around items-center gap-4 md:gap-10">
          <button
            className="py-2 px-4 bg-black rounded-md hover:bg-gray-300 flex"
            onClick={openSolscan}
          >
            <Image src={Solscan} width={50} height={50} alt="Solscan logo" />
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
