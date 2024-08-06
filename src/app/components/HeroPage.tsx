"use client"
import React from 'react'
import Image from 'next/image'
import LandingImage from "../../../public/assets/WhatsApp Image 2024-08-04 at 00.39.54_6435b378.jpg"
import Solanaimg from "../../../public/assets/solanaLogo.svg"
import {signIn, signOut, useSession} from "next-auth/react"
import Button from './Button'
import {  Archivo } from 'next/font/google'
import { useRouter } from 'next/navigation'


export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
})
const HeroPage = () => {
      const session = useSession()
      const router = useRouter();

  return (
    <main className={archivo.className}>
    <div className='bg-black h-[100vh] text-white grid grid-cols-2 p-16 '>

<div className="textAreahere   ">
    <span className="text-8xl text-blue-500 font-bold ">Lightning-Fast Trades, Minimal Fees</span> <br/>
    <span className="text-xl text-white/45 italic">Experience the next generation of decentralized trading on <span className='text-blue-500'>ANKDCEX</span>. 
          We offer seamless, secure, and cost-effective cryptocurrency exchanges.</span>
          <div className="pt-4">
              Powered By<Image width={500} height={100} src={Solanaimg} alt=''/>
          </div>
        
<div className="pt-8">
     {session.data?.user ? <Button onClick={() => {
        router.push("/Dashboard")
    }}>Go To Dashboard</Button> : <Button onClick={() => {
        signIn()
    }}>Login</Button>}
</div>
     
   
</div>
<div className="some_image_or_animation_here flex justify-center items-center align-middle">
    <Image width={400} height={400} src={LandingImage} alt=''/>
</div>

    </div>
    </main>
  )
}

export default HeroPage