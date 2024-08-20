import { SUPPORTED_TOKENS, TokenDetails } from "@/lib/constants";
import { useEffect, useState, useCallback } from "react";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { TokenWithBalance } from "../api/hooks/useTokens";
import { debounce } from "lodash";
import axios from "axios";
import { Button } from "./Button";

export function Swap({
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
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAssest, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
  const [baseAmmount, setBaseAmmount] = useState<string>();
  const [quoteAmmount, setQuoteAmmount] = useState<string>();
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState(null);

  const fetchQuote = useCallback(
    async (amount: any, inputMint: any, outputMint: any) => {
      if (!amount) return;

      setFetchingQuote(true);
      try {
        const response = await axios.get(`https://quote-api.jup.ag/v6/quote`, {
          params: {
            inputMint,
            outputMint,
            amount: Number(amount) * 10 ** baseAsset.decimals,
            slippageBps: 50,
          },
        });
        setQuoteAmmount(
          (
            Number(response.data.outAmount) / Number(10 ** quoteAssest.decimals)
          ).toString()
        );
        setQuoteResponse(response.data);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setFetchingQuote(false);
      }
    },
    [baseAsset.decimals, quoteAssest.decimals]
  );

  const debouncedFetchQuote = useCallback(debounce(fetchQuote, 300), [
    fetchQuote,
  ]);

  useEffect(() => {
    if (!baseAmmount) {
      setQuoteAmmount("");
      setQuoteResponse(null);
      return;
    }
    if (baseAsset.mint === quoteAssest.mint) {
      setQuoteAmmount("");
      setQuoteResponse(null);
      return;
    }

    const controller = new AbortController();

    debouncedFetchQuote(baseAmmount, baseAsset.mint, quoteAssest.mint);

    return () => {
      controller.abort();
      debouncedFetchQuote.cancel();
    };
  }, [baseAmmount, baseAsset.mint, quoteAssest.mint, debouncedFetchQuote]);

  const currentBalance = tokenBalances?.tokens.find(
    (x) => x.name === quoteAssest.name
  )?.balance;
  
  const disabled = Number(currentBalance) < Number(quoteAmmount);

  return (
    <div className='p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg'>
      <div className='mb-4'>
        <span className='text-2xl text-black font-bold'>Swap Tokens</span>
      </div>
      <div className='relative'>
        <SwapInputrow
          onSelect={(asset) => {
            setBaseAsset(asset);
          }}
          selectedToken={baseAsset}
          title='You Pay'
          bottomborderenabled={false}
          topborderenabled={true}
          currentbalance={` ${
            tokenBalances?.tokens.find((x) => x.name === baseAsset.name)
              ?.balance
          } ${baseAsset.name}`}
          amount={baseAmmount}
          onAmountchange={(value: string) => {
            setBaseAmmount(value);
          }}
        />

        <div
          onClick={() => {
            console.log("clicked here ");

            let baseassettemp = baseAsset;
            setBaseAsset(quoteAssest);
            setQuoteAsset(baseassettemp);
          }}
          className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 text-black rounded-full p-2'>
          <IoSwapVerticalOutline />
        </div>

        <SwapInputrow
          inputDisabled={true}
          inputLoading={fetchingQuote}
          onSelect={(asset) => {
            setQuoteAsset(asset);
          }}
          selectedToken={quoteAssest}
          title='You Get'
          topborderenabled={false}
          bottomborderenabled={true}
          currentbalance={` ${currentBalance} ${quoteAssest.name}`}
          amount={quoteAmmount}
          onAmountchange={(value: string) => {
            setBaseAmmount(value);
          }}
        />
      </div>
      <div className='flex justify-end items-end pt-5'>
        <Button
        disable={disabled}
          
          onClick={async () => {
            try {
              const res = await axios.post("/api/swap", {
                quoteResponse,
              });
              if (res.data.txnId) {
                alert("Swap done!");
              }
            } catch (e) {
              alert("Error while sending a txn");
            }
          }}>
          {disabled ? "Insufficient balance" : "Swap"}
        </Button>
      </div>
    </div>
  );
}

function SwapInputrow({
  title,
  onSelect,
  selectedToken,
  currentbalance,
  topborderenabled,
  bottomborderenabled,
  amount,
  onAmountchange,
  inputDisabled,
  inputLoading,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  title: string;
  topborderenabled: boolean;
  currentbalance?: string;
  bottomborderenabled: boolean;
  amount?: string;
  inputDisabled?: boolean;
  inputLoading?: boolean;
  onAmountchange: (value: string) => void;
}) {
  return (
    <div
      className={`border flex justify-between items-center p-4 ${
        topborderenabled ? "rounded-t-xl" : ""
      } ${bottomborderenabled ? "rounded-b-xl" : ""} `}>
      <div className='flex flex-col'>
        <span className='text-sm text-gray-500'>{title}</span>
        <AssetSelector onSelect={onSelect} selectedToken={selectedToken} />
        <span className='text-sm text-gray-500'>
          current balance ~ {currentbalance}
        </span>
      </div>
      <input
        disabled={inputDisabled}
        placeholder='0'
        className='border-none outline-none text-right p-2 text-4xl w-32'
        value={inputLoading ? "...." : amount}
        onChange={(e) => {
          onAmountchange(e.target.value);
        }}
      />
    </div>
  );
}

export function AssetSelector({
  selectedToken,
  onSelect,
}: {
  selectedToken: TokenDetails;
  onSelect: (asset: TokenDetails) => void;
}) {
  return (
    <div className='w-full mt-2'>
      <select
        onChange={(e) => {
          const selectedToken = SUPPORTED_TOKENS.find(
            (x) => x.name === e.target.value
          );
          if (selectedToken) {
            onSelect(selectedToken);
          }
        }}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
        {SUPPORTED_TOKENS.map((token) => (
          <option key={token.name} selected={selectedToken.name == token.name}>
            {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}
