"use client"
import { PublicKey } from '@solana/web3.js'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = ({userBalance}:
   { userBalance: string }
) => {
  const session = useSession();
  const router = useRouter()
  console.log(session);
  if(session.status === "loading"){
    return <div className='text-white flex justify-start items-center align-middle w-full'>
      Welcome to ANKDCEX, We are preparing your DashBoard
    </div>
  }

  if(!session.data?.user){
    router.push("/")
  }
  
  return (
    <div className='  flex justify-center items-center
     align-middle p-10'>
      <div className="name_and_detials flex items-center justify-center align-middle p-16 bg-white rounded-lg gap-4">
<img className='rounded-full border border-white' src={session.data?.user?.image ?? ""} alt='' />
<div className="greeting  text-2xl">
  <span>Welcome Back, </span>
  <span className='text-orange-600'>{session.data?.user?.name}</span>
</div>
 <div className="account_balance">
    
<Assets userbalance={userBalance}/>
      </div>
      </div>

     
    </div>
  )
}

export default Profile





function Assets({userbalance}:{
    userbalance: string 
}) {
    const [copied, setCopied] = useState(false)

    useEffect(() =>{
        if(copied){
            let timeout = setTimeout(()=>{
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [copied])
  return (
    <div className='text-sm text-white'>

     <button onClick={() =>{
navigator.clipboard.writeText(userbalance)
setCopied(true)
     }
     } className='bg-black p-3 rounded-xl' type="button">{copied? "Copied" : "Your Wallet Address"}</button>
    </div>
  )
}

