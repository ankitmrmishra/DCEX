"use client"
import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react"
import Button from './Button'
const Navbar = () => {
    const session = useSession()
  return (
    <div className='flex justify-between p-5 shadow-2xl bg-gray-800'>
<span className='text-orange-600 text-2xl text-center font-bold'>ADX </span>
<div>
    {session.data?.user ? <Button onClick={() => {
        signOut()
    }}>Logout</Button> : <Button onClick={() => {
        signIn()
    }}>Login</Button>}
</div>

    </div>
  )
}

export default Navbar