import {BarChartComponent} from "@repo/ui/chart"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "/lib/auth"


function get7Days(){
    const result=[]
    const today=new Date()
    for(let i=0;i<7;i++){
        const date=new Date(today)
        date.setDate(today.getDate()-i)
        result.push(new Date(date.toISOString().slice(0,10)))
    }
    return result
    
}

async function getWeeklyData(){
    const session=await getServerSession(authOptions)
    const userId=Number(session?.user.id)
    const onramptrans:Array<{date:Date,onramptrans:bigint}>=await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('day',"startTime") AS date,
            SUM(amount) AS onramptrans
        FROM 
            "OnRampTransaction"
        WHERE 
            "startTime">=NOW() - INTERVAL '7 days'
            AND "userId"=${userId}
        GROUP BY 
            DATE_TRUNC('day',"startTime")
        ORDER BY
            date;`
    const sentTransaction:Array<{date:Date,sentamount:bigint}>=await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('day',"timeStamp") AS date,
            SUM(amount) AS sentAmount
        FROM 
            "p2ptranfers"
        WHERE 
            "timeStamp">=NOW() - INTERVAL '7 days'
            AND "fromUserId"=${userId}
        GROUP BY 
            DATE_TRUNC('day',"timeStamp")
        ORDER BY
            date;`
    const receivedTransaction:Array<{date:Date,receivedamount:bigint}>=await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('day',"timeStamp") AS date,
            SUM(amount) AS ReceivedAmount
        FROM 
            "p2ptranfers"
        WHERE 
            "timeStamp">=NOW() - INTERVAL '7 days'
            AND "toUserId"=${userId}
        GROUP BY 
            DATE_TRUNC('day',"timeStamp")
        ORDER BY
            date;`
    const get7days=get7Days()
    get7days.forEach(element => {
        if (!onramptrans.find(x => x.date.toISOString().slice(0, 10)===element.toISOString().slice(0, 10))){
            onramptrans.push({ date: element, onramptrans: BigInt(0)});
        }
        if (!receivedTransaction.find(x => x.date.toISOString().slice(0, 10)===element.toISOString().slice(0, 10))){
            receivedTransaction.push({ date:element, receivedamount: BigInt(0) }); 
        }
        if (!sentTransaction.find(x => x.date.toISOString().slice(0, 10)===element.toISOString().slice(0, 10) )) {
            sentTransaction.push({ date:element, sentamount: BigInt(0) }); 
        }
    });
    for(let i=0;i<onramptrans.length;i++){
        const datekey=receivedTransaction[i]?.date
        const existingEntry=onramptrans.find(x=>
            x.date.getTime()===datekey?.getTime()
        )
        if(existingEntry){
            existingEntry.onramptrans+=receivedTransaction[i]?.receivedamount||BigInt(0)
        }
    }
    onramptrans.sort((a,b)=>a.date.getTime()-b.date.getTime())
    sentTransaction.sort((a,b)=>a.date.getTime()-b.date.getTime())
    const mergedTransaction=[]
    for(let i=0;i<7;i++){
        const date=onramptrans[i]?.date.toISOString().slice(0,10)
        mergedTransaction[i]={
            date:date,
            spent:Number(sentTransaction[i]?.sentamount)/100,
            received:Number(onramptrans[i]?.onramptrans)/100
        }
    }
    return mergedTransaction
    
}

export default async function UserChart(){
    const data=await getWeeklyData()
    return <div>
            <BarChartComponent Title="This week's report" chartData={data}
            Description="Weekly Financial Overview: Spending vs. Receiving"
             ></BarChartComponent>
    </div>
}
