"use client"
import { PlusCircle } from "lucide-react";
import DataUnitList from "./components/table/main-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <p className="text-2xl font-bold">Tabel Lokasi Kerja</p>
            <Button className="flex w-fit rounded font-bold" onClick={() => router.push('/dataunits/form')}>
            <div className="flex items-center">
                <PlusCircle size={18} className="mr-2" />
                Tambah Lokasi Kerja
            </div>
            </Button>
            <DataUnitList />
        </div>
    )
}