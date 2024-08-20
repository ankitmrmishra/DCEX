import { getServerSession } from "next-auth";

import { authConfig } from "@/lib/auth";
import db from "@/app/db";

export const UserBalance = async () => {
  const session = await getServerSession(authConfig);

  const UsersolWallet = await db.solWallet.findFirst({
    where: {
      userId: session?.user?.uid,
    },
    select: {
      publicKey: true,
    },
  });
  if (!UsersolWallet) {
    return;
    {
      error: " No Wallet found";
    }
  }

  return { error: null, UsersolWallet };
};