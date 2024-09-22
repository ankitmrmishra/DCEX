const TrustedByCompanies = () => {
  return (
    <div className=" w-[70%] bg-white rounded-3xl p-7 shadow-lg shadow-gray-700 drop-shadow-2xl ">
      <div className="">
        <h1 className="text-black font-semibold mb-3 text-5xl flex justify-center align-middle items-center">
          We are Trusted By{" "}
        </h1>
      </div>

      <div className="companies grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
        {web3Companies.map((company, index) => {
          return (
            <div
              key={index}
              className="company-card border rounded-3xl p-4 text-center bg-black "
            >
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center flex-col items-center align-middle  text-center"
              >
                <img
                  src={company.image}
                  alt={`${company.name} logo`}
                  className="company-logo h-14 "
                />
                <h2 className="company-name font-semibold text-white ">
                  {company.name}
                </h2>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TrustedByCompanies;
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
