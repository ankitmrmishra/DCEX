
import { getSession } from "next-auth/react";
import HeroPage from "./components/HeroPage";
import DashBoard from "./Dashboard/page";


export default async function Home() {
  
  const session = await getSession()
  return (
    <main className="bg-black">
      {session?.user ? <HeroPage />  :  <DashBoard />}
      
    </main>
  );
}
