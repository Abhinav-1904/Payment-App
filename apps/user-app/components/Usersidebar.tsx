"use client"
import { usePathname, useRouter } from "next/navigation"
interface sidebarprops{
    icon:React.ReactNode,
    href:string,
    title:string
}
export default function UserSidebar({href,title,icon}:sidebarprops){
    const router=useRouter()
    const Pathname=usePathname()
    const selected= Pathname===href
    return <div className={`flex pb-3 cursor-pointer ${selected?"text-violet-500":"text-slate-500"}`} 
    onClick={()=>{
        router.push(href)
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className='font-semibold'>
            {title}
        </div>
    </div>
}