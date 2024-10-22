import SendCard from "../../../components/SendCard";

export default function (){
    return <div className="w-full pt-4 pl-2">
            <div className="text-purple-500 text-3xl font-medium ">
                Peer-to-Peer Transfer
            </div>
            <div className="flex justify-center items-center w-full h-[70vh] ">
            <SendCard></SendCard>
        </div>
    </div>
}