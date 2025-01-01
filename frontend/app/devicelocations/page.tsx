 "use client"
import { PlusCircle } from "lucide-react";
import DeviceLocationList from "./components/table/main-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <p className="text-2xl font-bold">Main Location</p>
            <Button className="flex w-fit rounded font-bold" onClick={() => router.push('/deviceLocations/form')}>
                <div className="flex items-center">
                    <PlusCircle size={18} className="mr-2" />
                    Add Main Location
                </div>
            </Button>
            <DeviceLocationList />
        </div>
    )
}