'use client'
import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image';
export default function CustomappBar(){
  const session=useSession()
  return <div>
    <Appbar className="geistSans bg-zinc-750 font-lightbold text-xl" user={session.data?.user?.name} 
      onSignin={signIn} onSignout={signOut} logo={
        <Image 
          src="/swiftlogo.png" 
          alt="SwiftPay Logo" 
          width={50} 
          height={50} 
        />
      }>
    </Appbar>
  </div>
}