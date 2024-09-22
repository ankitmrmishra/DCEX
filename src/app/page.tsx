import HeroPage from "./components/HeroPage";
import DashBoard from "./Dashboard/page";

import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="dark">{session?.user ? <DashBoard /> : <HeroPage />}</main>
  );
}
