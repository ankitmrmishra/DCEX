import Profile from "../components/Profile";

import { UserBalance } from "./UserBalance";

export default async function DashBoard() {
  const userwallet = await UserBalance();
  if (userwallet?.error || !userwallet?.UsersolWallet.publicKey) {
    return <>No solana wallet found</>;
  }

  return (
    <div className="flex justify-center align-middle items-center md:p-10 px-2 py-5  md:mt-20  ">
      <Profile publicKey={userwallet.UsersolWallet.publicKey} />
    </div>
  );
}
