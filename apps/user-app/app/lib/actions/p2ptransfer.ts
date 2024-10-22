'use server'
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
export default async function p2ptranfers(amount:Number,numberto:string) {
    const session=await getServerSession(authOptions)
    const userId=session?.user?.id
    if(!userId){
        return {
            message:"User not logged in"
        }
    }
    const user=await prisma.user.findFirst({
        where:{
            mobile_number:numberto
        }
    })
    if(!user){
        return {
            message:"User with this mobile number doesnt exist"
        }
    }
    if(user?.id===Number(userId)){
        return {
            message:"Cant send money to yourself"
        }
    }
    try{
        await prisma.$transaction(async(tx)=>{
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(userId)} FOR UPDATE;`
            const findBalance=await prisma.balance.findFirst({
                where:{
                    userId:Number(userId)
                }
            })
            if(!findBalance || findBalance?.amount<Number(amount)){
                throw new Error("Insufficient balance")
            }
            await tx.balance.update({
                where:{
                    userId:Number(userId)
                },
                data:{
                    amount:{
                        decrement:Number(amount)
                    }
                }
            })
            await tx.balance.update({
                where:{
                    userId:user.id
                },
                data:{
                    amount:{
                        increment:Number(amount)
                    }
                }
            })
            await tx.p2ptranfers.create({
                data:{
                    timeStamp:new Date(),
                    amount:Number(amount),
                    fromUserId:Number(userId),
                    toUserId:user.id
                }
            })
        })
    }catch(e){
        console.log(e)
        return {
            message:"an error occured"
        }
    }
}