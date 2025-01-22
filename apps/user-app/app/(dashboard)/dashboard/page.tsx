
import UserChart from "../../../components/UserChart"
export default function dashboard(){
    return <div className="pt-4 pl-2 w-full h-screen ">
        <div className="text-purple-500 font-medium text-3xl">
            Weekly Report of spendings
        </div>
        <div className="flex justify-center">
            <div className="w-1/2 h-1/2 mt-2">
                <UserChart></UserChart>
            </div>
        </div>
    </div>
}
