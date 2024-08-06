import { NextRequest, NextResponse } from "next/server";
import {getAssociatedTokenAddress, getAccount, getMint} from "@solana/spl-token"
import { connection, SUPPORTED_TOKENS, getTokens } from "@/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const address = searchParams.get('address') as unknown as string;
    const supportedTokens = await getTokens();
    // ata associated token account
    // pda programme derived address
   const balances = await Promise.all(supportedTokens.map(token => getAccountBAlance(token, address)))

  const tokens =   supportedTokens.map((token, index) =>({
            ...token,
            balance: balances[index],
            usdBalance: balances[index] * Number(token.price)
        }))

        return NextResponse.json({
            tokens,
            totalbal : tokens.reduce((acc, val) => acc + val.usdBalance, 0)
        })

}


async function getAccountBAlance(token :{
    name : string;
    mint: string;
    native: boolean;
   
}, address: string){
if(token.native){
    let balance = await connection.getBalance(new PublicKey(address))
    return balance / LAMPORTS_PER_SOL;
}

const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address))



try {
         const account= await getAccount(connection, ata)
        const mint = await getMint(connection, new PublicKey(token.mint));
        return Number(account.amount) / (10 ** mint.decimals)
    } catch(e) {
        return 0;
    }
}