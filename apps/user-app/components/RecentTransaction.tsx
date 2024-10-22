import {Createdcard} from '@repo/ui/card'
interface transactionprops{
    alltransactions:Array<{time?:Date,amount?:number}>

}
export default function RecentTransactions({alltransactions}:transactionprops){
    const recent=alltransactions.length
    return <div className='pt-2'>
        <Createdcard title={recent==1?'Recent Transactions':'All Transactions' }
        children={<Cardform alltransactions={alltransactions}/>}></Createdcard>
    </div>
}
function Cardform({alltransactions}:transactionprops){
    if(alltransactions.length==0){
        return <div>
            No Recent Transactions
        </div>
    }

    return <div className='justify-between'>
        <div>
            <div className='font-medium'>
                Received INR
            </div>
                {alltransactions.map((value,index)=>
                    <div key={index} className='flex justify-between w-full pt-1'>
                        <div className='text-slate-500'>
                            {value.time?.toISOString().slice(0, 10)}
                            
                        </div>
                        <div className='flex flex-col justify-center font-medium text-green-500'>
                            +Rs {value.amount?value.amount/100:'0.00'}
                        </div>
                    </div>
                )}
        </div>
    </div>
            
}