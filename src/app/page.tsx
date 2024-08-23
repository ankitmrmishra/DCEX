
import { getSession } from "next-auth/react";
import HeroPage from "./components/HeroPage";
import DashBoard from "./Dashboard/page";


export default async function Home() {
  
  return (
    <main className="bg-black">
       <HeroPage />  
      
    </main>
  );
}
