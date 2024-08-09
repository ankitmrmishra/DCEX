import { TokenDetails } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithBalance extends TokenDetails {
  balance: string;
  usdBalance: string;
}

export function useTokens(address: string) {
  const [tokenBalances, setTokenBalances] = useState<{
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/tokens?address=${address}`).then((res) => {
      setTokenBalances({
        totalBalance: res.data.totalbal,
        tokens: res.data.tokens,
      });

      setLoading(false);
    });
  }, []);

  return {
    loading,
    tokenBalances,
  };
}

// this hoook returns everything that our backend was returning....
