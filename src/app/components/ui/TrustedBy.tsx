import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function TrustedByCompanies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicatedLogos, setDuplicatedLogos] = React.useState(web3Companies);

  useEffect(() => {
    const duplicateLogos = () => {
      setDuplicatedLogos([...web3Companies, ...web3Companies]);
    };
    duplicateLogos();
  }, []);

  return (
    <div className="w-full bg-black text-white py-12 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-8">We are Trusted By</h2>
      <div className="relative w-full">
        <motion.div
          ref={containerRef}
          className="flex"
          animate={{
            x: [0, -50 * duplicatedLogos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:w-[100px] w-[40px] mx-4"
            >
              <img src={logo.image} alt={logo.name} className="w-16 h-auto" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
const web3Companies = [
  {
    name: "Solana Labs",
    description:
      "The core organization behind the Solana blockchain, building high-performance decentralized applications.",
    website: "https://solana.com",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024",
  },
  {
    name: "Serum",
    description:
      "A decentralized exchange (DEX) and ecosystem bringing fast and low-cost trading to decentralized finance on Solana.",
    website: "https://projectserum.com",
    image: "https://cryptologos.cc/logos/serum-srm-logo.png?v=024",
  },
  {
    name: "ChainLink",
    description:
      "An automated market maker (AMM) and liquidity provider for decentralized trading on the Solana blockchain.",
    website: "https://raydium.io",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=035",
  },
  {
    name: "Space ID",
    description:
      "A virtual gaming metaverse built on Solana, merging blockchain technology with online gaming.",
    website: "https://staratlas.com",
    image: "https://cryptologos.cc/logos/space-id-id-logo.png?v=035",
  },
  {
    name: "Mango Markets",
    description:
      "A decentralized finance platform offering cross-margin trading and decentralized governance.",
    website: "https://mango.markets",
    image: "https://cryptologos.cc/logos/mango-markets-mngo-logo.png?v=024",
  },
  {
    name: "Flare",
    description:
      "A decentralized music streaming service on Solana, aimed at empowering artists and listeners.",
    website: "https://audius.co",
    image: "https://cryptologos.cc/logos/flare-flr-logo.png?v=035",
  },
  {
    name: "Orca",
    description:
      "A user-friendly decentralized exchange (DEX) on Solana with a focus on ease of use and fast swaps.",
    website: "https://orca.so",
    image: "https://cryptologos.cc/logos/orca-orca-logo.png?v=024",
  },
  {
    name: "Paypal",
    description:
      "A decentralized application that provides on-chain trading, order books, and data analytics for Solana.",
    website: "https://bonfida.com",
    image: "https://cryptologos.cc/logos/paypal-usd-pyusd-logo.png?v=035",
  },
  {
    name: "Nexo",
    description:
      "A decentralized lending and borrowing platform built on Solana.",
    website: "https://solend.fi",
    image: "https://cryptologos.cc/logos/nexo-nexo-logo.png?v=035",
  },
  {
    name: "Polygon",
    description:
      "A portfolio manager for Solana assets, providing users with insights and analytics.",
    website: "https://step.finance",
    image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=035",
  },
];
