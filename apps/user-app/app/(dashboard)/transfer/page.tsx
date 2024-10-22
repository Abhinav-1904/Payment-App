import AddMoneyCard from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import RecentTransactions from "../../../components/RecentTransaction";
import prisma from "@repo/db/client"
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'


async function getBalance(){
    const session=await getServerSession(authOptions)
    const balance=await prisma.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return {
        amount:balance?.amount||0,
        locked:balance?.locked||0
    }
}
async function gettransactions(){
    const session=await getServerSession(authOptions)
    const transactions=await prisma.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user.id)
        },
        orderBy:{
            startTime:'desc'
        },
        take:1
    })
    return transactions.map((value)=>{
        return {
            time:value.startTime,
            status:value.status,
            amount:value.amount,
            provide:value.provider
        }
    })
}

export default async function transfer(){
    const balance=await getBalance()
    const transaction=await gettransactions()
    return <div className="w-full"> 
        <div className="text-purple-500 text-3xl font-medium pt-4 pl-2">
            Transfer
        </div>
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-5">
                <div className="flex flex-col justify-center">
                    <AddMoneyCard></AddMoneyCard>
                </div>
                <div className="px-5 invisible md:visible">
                    <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    <RecentTransactions alltransactions={transaction}/>
                </div>
            </div>
        </div>
    </div>
}