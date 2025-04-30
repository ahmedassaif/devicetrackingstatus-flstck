"use client"
import { Folder, PlusCircle } from "lucide-react";
import DeviceLocationList from "./components/table/main-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DeviceLocationInfo from "@/components/alerts/deviceLocationInfo.alert";

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <p className="text-2xl font-bold">Detail Lokasi Kerja</p>
            <DeviceLocationInfo />
            <div className="flex flex-row items-center gap-2">
                <Button className="flex w-fit rounded font-bold" onClick={() => router.push('/devicelocations/form')}>
                    <div className="flex items-center">
                        <PlusCircle size={22} className="mr-2" />
                        Tambah Detail Lokasi Kerja
                    </div>
                </Button>
                <Button className="flex w-fit rounded font-bold" onClick={() => router.push('/dataunits')}>
                    <div className="flex items-center">
                        <Folder size={22} className="mr-2" />
                        Atur Lokasi Kerja
                    </div>
                </Button>
            </div>
            <DeviceLocationList />
        </div>
    )
}