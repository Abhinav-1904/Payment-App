"use client"

import { Createdcard } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useState } from "react";
import p2ptranfers from "/lib/actions/p2ptransfer";


export default function (){
    const [amount,setAmount]=useState(0)
    const [number,setNumber]=useState("")
    const p2ptransfer=async(e:React.FormEvent)=>{
        e.preventDefault()
        await p2ptranfers(amount*100,number)
    }
    return <div className="w-96">
        <Createdcard title="Send Money" children={<CardForm setAmount={setAmount} setNumber={setNumber}/>} 
        cardfooter="Send" onDeposit={p2ptransfer}/>
    </div>
}
function CardForm({setAmount,setNumber}:{
    setAmount:(url:number)=>void,
    setNumber:(url:string)=>void
}){
    return <div >
        <div className=" space-y-1.5">
            <Label htmlFor="Mobile Number">Mobile Number</Label>
            <Input id="Mobile Number" placeholder="Enter the receivers number" onChange={(e)=>{
                setNumber(e.target.value)
            }}></Input>
        </div>
        <div className=" pt-2 space-y-1.5">
            <Label htmlFor="Amount"> Amount</Label>
            <Input id="Amount" onChange={(e)=>{
                setAmount(Number(e.target.value))
            }} placeholder="Enter the amount"></Input>
        </div>
    </div>
}