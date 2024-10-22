import {Createdcard} from '@repo/ui/card'
interface BalanceProps{
    amount:number,
    locked:number
}
export default function BalanceCard({amount,locked}:BalanceProps){
    return <div>
        <Createdcard title='Balance' children={<Cardform amount={amount} locked={locked}></Cardform>}/>
    </div>
}
function Cardform({amount,locked}:BalanceProps){
    return <div>
        <div className='flex justify-between'>
            <div>
                Unlocked Balance
            </div>
            <div>
                {amount/100} INR
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
                Locked Balance
            </div>
            <div>
                {locked/100} INR
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
                
                Total Balance
            </div>
            <div>
                {(locked+amount)/100} INR
            </div>
        </div>
    </div>
}