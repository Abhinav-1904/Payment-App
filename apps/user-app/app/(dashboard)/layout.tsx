
import { getServerSession } from "next-auth";
import CustomappBar from "../../components/Userappbar";
import UserSidebar from "../../components/Usersidebar";
import { Clock3,ArrowLeftRight,HomeIcon,Send } from "lucide-react";
import { authOptions } from "/lib/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session=await getServerSession(authOptions)
    if(!session?.user){
        redirect('/signin')
    }
    return <div className="geistSans ">
        <div className="border-b border-slate-300">
          <CustomappBar/>
        </div>
        <div className="flex">
          <div className="w-56 geistSans pl-6 border-r mr-4 pt-28 border-slate-300 min-h-screen">
            <UserSidebar icon={<HomeIcon></HomeIcon>} title="Home" href="/dashboard" />
            <UserSidebar icon={<ArrowLeftRight></ArrowLeftRight>} title="Transfer" href="/transfer" />
            <UserSidebar icon={<Clock3></Clock3>} title="Transactions" href="/transaction" />
            <UserSidebar icon={<Send></Send>} title="P2P Transfer" href="/p2p"/>
          </div>
          {children}
        </div>
    </div>
}
 