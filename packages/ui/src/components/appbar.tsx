"use client"
import {useRouter} from 'next/navigation'
import { Button } from '@/src/components/ui/button'
interface appbarprops{
  className:string,
  user?:string | null,
  onSignin:any,
  onSignout:any,
  logo:JSX.Element
}
export const Appbar = ({className,user,onSignin,onSignout,logo}:appbarprops) => {
  const router =useRouter()
  return <div className={className}>
      <div className="flex px-4 pt-4 justify-between">
          <div className='flex pb-4'>
            {logo}
            <button onClick={()=>router.push('/')} className='text-xl pl-2 text-[#333333] hover:text-black'>
              SwiftPay
            </button>
          </div>
          <div>
              <Button onClick={user?onSignout:onSignin} className='text-medium text-gray-700 hover:text-black' 
              variant='ghost'>{user?"Logout":"Login"}</Button>
          </div>
      </div>
    </div>
  
};
  