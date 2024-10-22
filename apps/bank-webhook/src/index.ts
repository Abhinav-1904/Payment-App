import express from "express";
import prisma from "@repo/db/client";
const app=express()
app.use(express.json())
app.post("/bankwebhook",async (req,res)=>{
    const paymentInfo:{
        token: string;
        userId: string;
        amount: string
    }={
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try{
        const transactionstatus=await prisma.onRampTransaction.findFirst({
            where:{
                token:paymentInfo.token
            },
            select:{
                status:true
            }
        })
        if(transactionstatus?.status!='Processing'){
            res.status(411).json({
                message:"transaction isnt initiated or is failed"
            })
            return 
        }

    } catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    try{
        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId:Number(paymentInfo.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInfo.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"Success"
                }
            })
        ])
    } catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    res.status(201).json({
        message:"captured"
    })
})
app.listen(3003);