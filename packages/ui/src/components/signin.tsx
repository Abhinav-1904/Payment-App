"use client"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {useRouter,useSearchParams} from 'next/navigation'

interface SignInProps {
    logo: JSX.Element; 
    signupImage: JSX.Element
}

export const SignIn=({logo,signupImage}:SignInProps)=>{

    const name=useRef("");
    const password=useRef("");
    const mobile_number=useRef("");
    const router=useRouter()
    const searchParams=useSearchParams()

    const message=searchParams.get('message')
    const onSubmit=async()=>{
        const result=await signIn("credentials",{
            name:name.current,
            password:password.current,
            mobile_number:mobile_number.current,
            redirect:true,
            callbackUrl:'/'
        })
    }
    const googleSignin=()=>{
        signIn("google",{callbackUrl:'/'})
    }
    const githubSignin=()=>{
        signIn("github",{callbackUrl:'/'})
    }
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-screen bg-white">
                <div className="flex justify-center pt-5">
                    {logo}
                    <button onClick={()=>router.push('/')} className="flex pl-2 flex-col justify-center text-3xl geistSans">
                        SwiftPay
                    </button>
                </div>
                <div className="gesitSans text-center mt-14">
                    {message && <p className="text-red-700 font-medium">{message}</p>}
                    <div className="text-4xl  ">
                        Welcome 
                    </div>
                    <div className="text-gray-400">
                        Please enter your details
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                        <Label className="text-left" htmlFor="text">Name</Label>
                        <Input onChange={(e)=>{
                            (name.current=e.target.value)
                        }} id="name" type="text" placeholder="Enter your name" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto pt-2">
                        <Label className="text-left" htmlFor="text">Mobile Number</Label>
                        <Input onChange={(e)=>{
                            (mobile_number.current=e.target.value)
                        }} id="mobile_number" type="text" placeholder="Enter your mobile number" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto pt-2">
                        <Label className="text-left" htmlFor="password">Password</Label>
                        <Input onChange={(e)=>{
                            (password.current=e.target.value)
                        }} id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <div className="pt-2 w-full">
                        <Button onClick={onSubmit} className="w-full max-w-sm" >Signup</Button>
                    </div>
                    <div className="flex items-center mx-auto max-w-sm my-4">
                        <div className="flex-grow border-t border-gray-300 max-w-"></div>
                        <span className="px-3 text-gray-500">Or Continue With</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex justify-center">
                        <FaGoogle onClick={googleSignin} className="h-6 w-6 cursor-pointer"/>
                        <FaGithub onClick={githubSignin} className="mx-3 h-6 w-6 cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-12 text-center font-semibold text-teal-600 font-Normal text-2xl">
                    Empowering Every Transaction with Speed and Security
                </div>
                <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                    {signupImage}
                </div>
            </div>
        </div>
    </div>
}