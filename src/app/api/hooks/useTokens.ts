import { TokenDetails } from "@/lib/constants"
import axios from "axios";
import { useEffect, useState } from "react"




interface TokenWithBalance extends TokenDetails{
    balance: string,
    usdBalance: string,
}


export function useTokens(){
    const [tokens, setTokens] = useState<{
        tokenBalance: number,
        tokens: TokenWithBalance[]
    } |  null>(null)

    const [loading, setLoading] = useState(true);
   useEffect(() =>{
   axios.
   }, [])
}