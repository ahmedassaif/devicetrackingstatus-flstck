 "use client"
import { Folder, InfoIcon, PlusCircle } from "lucide-react";
import DeviceLocationList from "./components/table/main-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <p className="text-2xl font-bold">Lokasi Utama Perangkat</p>
            <Alert>
                <InfoIcon className="size-4" />
                <AlertTitle className="pb-2 pt-1"><b>Informasi</b></AlertTitle>
                <AlertDescription>
                    <p>Lokasi Utama adalah bagian wilayah dari Lokasi Kerja.</p>
                    <p>Misalnya di dalam Lokasi Kerja <b>Kantor Pusat</b> terdapat Lokasi Utama <b>Gedung Direktur</b> dan <b>Kantor Security</b>.</p>
                </AlertDescription>
            </Alert>
            <div className="flex flex-row items-center gap-2">
                <Button className="flex w-fit rounded font-bold" onClick={() => router.push('/devicelocations/form')}>
                    <div className="flex items-center">
                        <PlusCircle size={22} className="mr-2" />
                        Tambah Lokasi Utama
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