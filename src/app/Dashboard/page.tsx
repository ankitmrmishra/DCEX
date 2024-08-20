
import Profile from "../components/Profile";

import { UserBalance } from "./UserBalance";



export default async function DashBoard() {
  const userwallet = await UserBalance();
  if (userwallet?.error || !userwallet?.UsersolWallet.publicKey) {
    return <>No solana wallet found</>;
  }

  return (
    <div className='flex justify-center align-middle items-center p-10'>
      <Profile publicKey={userwallet.UsersolWallet.publicKey} />
    </div>
  );
}
