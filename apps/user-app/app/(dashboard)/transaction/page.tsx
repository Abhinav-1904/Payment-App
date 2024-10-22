import { getServerSession } from "next-auth"
import { authOptions } from "/lib/auth"
import prisma from "@repo/db/client"
import RecentTransactions from "../../../components/RecentTransaction"
import Peer2PeerCard from "../../../components/Peer2PeerCard"


async function getpeerTransactions() {
    const session=await getServerSession(authOptions)
    const getFromTransaction=await prisma.p2ptranfers.findMany({
        where:{
            fromUserId:Number(session?.user.id)
        }
    })
    const getToTransactions=await prisma.p2ptranfers.findMany({
        where:{
            toUserId:Number(session?.user.id)
        }
    })
    const allTransactions = [...getFromTransaction, ...getToTransactions];
    allTransactions.sort((a, b) => {
        return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
    });

    return allTransactions.map((value)=>{
        return {
            time:value.timeStamp,
            from:value.fromUserId,
            to:value.toUserId,
            amount:value.amount
        }
    });
}
async function gettransactions(){
    const session=await getServerSession(authOptions)
    const gettransaction=await prisma.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user.id)
        }
    })
    return gettransaction.map((value)=>{
        return{
            time:value.startTime,
            amount:value.amount,
        }
    })
}
export default async function transaction(){
    const alltransaction=await gettransactions()
    const allpeerTransaction=await getpeerTransactions()
    return <div className="grid grid-cols-2 w-full pt-4 pl-2">
            <div >
                <div className="text-purple-500 font-medium text-3xl mb-2">
                    Bank Transfers
                </div>
                <div>
                    <RecentTransactions alltransactions={alltransaction}></RecentTransactions>
                </div>
            </div>
        <div >
            <div className="pl-6 pr-6">
                <div className="text-purple-500 font-medium text-3xl mb-2">
                    Peer-to-Peer Transfers
                </div>
                <div>
                    <Peer2PeerCard allTransactions={allpeerTransaction}></Peer2PeerCard>
                </div>
            </div>
        </div>
    </div>
}