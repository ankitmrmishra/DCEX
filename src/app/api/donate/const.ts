import { UserBalance } from "@/app/Dashboard/UserBalance";
import { PublicKey } from "@solana/web3.js";

async function getUserPubKey(): Promise<PublicKey | null> {
  const userWallet = await UserBalance();
  if (userWallet?.error || !userWallet?.UsersolWallet.publicKey) {
    return null;
  }
  return new PublicKey(userWallet.UsersolWallet.publicKey);
}

export async function getDefaultOrUserPubKey(): Promise<PublicKey> {
  const userPubKey = await getUserPubKey();
  return userPubKey || new PublicKey("11111111111111111111111111111111"); // Solana's system program address as fallback
}

export const DEFAULT_SOL_AMOUNT: number = 1.0;

// Usage example:
// const solAddress = await getDefaultOrUserPubKey();