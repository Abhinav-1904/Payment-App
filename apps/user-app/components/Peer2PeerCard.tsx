import { Createdcard } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";
import {ScrollArea,ScrollBar} from "@repo/ui/scroll-area"

interface transactionprops{
    allTransactions:Array<{time?:Date,amount?:number,from:number,to:number}>
    sessionId:number
}
interface transactionprops2{
    allTransactions:Array<{time?:Date,amount?:number,from:number,to:number}>
}
export default async function({allTransactions}:transactionprops2){
    const session=await getServerSession(authOptions)
    return <div className=''>
        <Createdcard title='All Transactions'
        children={<Cardform allTransactions={allTransactions} sessionId={Number(session?.user.id)}/>}/>
    </div>
}
function Cardform({allTransactions,sessionId}:transactionprops){
    return <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="p-4">
        {allTransactions.map((value,index)=>
            <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between w-full">
                    <div className="font-medium">
                        {sessionId===value.from?"Sent INR":"Received INR"}
                    </div>
                    <div className={sessionId===value.from?"text-red-600 font-medium ":"text-green-500 font-medium"}>
                        {sessionId===value.from?"-Rs ":"+Rs "}{value.amount?value.amount/100:'0.00'}
                    </div>
                </div>
                <div className="text-slate-500">
                    {value.time?.toISOString().slice(0, 10)}
                </div>
            </div>  
        )}
    </div>
    <ScrollBar></ScrollBar>
    </ScrollArea>
}