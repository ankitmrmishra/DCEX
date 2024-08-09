import { Connection } from "@solana/web3.js";

import axios from "axios";

let LAST_UPDATED: number | null = null;
let price: {
  [key: string]: {
    price: string;
  };
} = {};
const TOKEN_REFRESH = 60 * 1000;
export interface TokenDetails {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  image: string;
  decimals: number;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180",
    image:
      "https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png",
    decimals: 9,
  },
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image:
      "https://icones.pro/wp-content/uploads/2024/04/blue-usdc-icon-symbol-logo.png",
    decimals: 6,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/KTF6M73FKBACNI5JQ4S3EW7MRI.png",
    decimals: 6,
  },
];

// check the link if error occurs
export const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/oRlwZdF1YHNVuKVd_TVvdPlHPjuzMLnX"
);

export async function getTokens() {
  if (!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_REFRESH) {
    const response = await axios.get(
      "https://price.jup.ag/v6/price?ids=SOL,USDC,USDT"
    );

    price = response.data.data;
    LAST_UPDATED = new Date().getTime();
  }

  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: price[s.name].price,
  }));
}

getTokens();
