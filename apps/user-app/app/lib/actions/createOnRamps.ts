'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function createOnRampTrans(amount:number,provider:string){
    const session=await getServerSession(authOptions)
    const userId=session?.user.id
    if(!userId){
        return {
            message:"User not logged in"
        }
    }
    const token=Math.random().toString()
    await prisma?.onRampTransaction.create({
        data:{
            token:token,
            provider,
            amount,
            startTime:new Date(),
            userId:Number(userId),
            status:'Processing'
        }
    })
    return {
        message:'on ramp transaction added'
    }
}