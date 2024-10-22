import {SignIn} from '@repo/ui/signin'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
const Signinpage=async ()=>{
    const session=await getServerSession(authOptions)
    if(session?.user){
        redirect('/')
    }
    return <SignIn logo={
        <Image 
          src="/swiftlogo2.png" 
          alt="SwiftPay Logo" 
          width={50} 
          height={50} 
        />} signupImage={
      <Image 
        src="/signupImage.png" 
        alt='SwiftPay Secure Pay' 
        width={1000} 
        height={1000}/>}></SignIn>
      
}
export default Signinpage