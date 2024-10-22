"use client"
import {Createdcard} from '@repo/ui/card'
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "//components/ui/select"
import createOnRampTrans from '/lib/actions/createOnRamps'

const supportedBanks=[{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoneyCard(){
    const [reditecturl,setredirecturl]=useState(supportedBanks[0]?.redirectUrl)
    const [amount,setAmount]=useState(0)
    const [provider,setProvider]=useState(supportedBanks[0]?.name??"")
    const handleDepoist=async(e:React.FormEvent)=>{
        e.preventDefault();
        await createOnRampTrans(amount*100,provider)
        if(reditecturl){
            window.location.href=reditecturl
        }
    }
    return <div>
        <Createdcard title='Add Money' cardfooter='Deposit' 
            children={<Cardform set={setredirecturl}  setProvider={setProvider}
            setAmount={setAmount}></Cardform>} onDeposit={handleDepoist}/>
    </div>
}

function Cardform({set,setAmount,setProvider}:{
    set?:(url: string) => void
    setAmount?:(url:number)=>void
    setProvider?:(url:string)=>void
}){
    return <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Amount">Amount</Label>
              <Input id="Amount" onChange={(e)=>{
                if(setAmount){
                setAmount(Number(e.target.value))
                }}} placeholder="Amount" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Bank">Bank</Label>
              <Select onValueChange={(value)=>{
                    const bank=supportedBanks.find(x=>value===x.name)
                    if(setProvider && bank){
                        setProvider(bank.name)
                    }
                    if(bank && set){
                        set(bank.redirectUrl)
                    }
                }
                }>
                <SelectTrigger id="Bank">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {
                        supportedBanks.map((bank,index)=>
                            <SelectItem key={index} value={bank.name} >{bank.name}</SelectItem>
                        )
                    }
                </SelectContent>
              </Select>
            </div>
          </div>
    </form>
}