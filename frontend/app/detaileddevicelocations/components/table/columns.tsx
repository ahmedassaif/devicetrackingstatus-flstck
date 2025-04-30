import { ColumnDef } from "@tanstack/react-table";
import { DetailedDeviceLocationDto } from "@/api/services/types/detailedDeviceLocation.types";

export const columns: ColumnDef<DetailedDeviceLocationDto>[] = [
    {
        header: "Actions",
    },
    {
        accessorKey: "NameUnit",
        header: "Lokasi Kerja",
    },
    {
        accessorKey: "NameDeviceLocation",
        header: "Lokasi Utama Perangkat",
    },
    {
        accessorKey: "NameDetailLocation",
        header: "Detail Lokasi Perangkat",
    },
    {
        accessorKey: "MainDetailLocation",
        header: "Main",
    },
    {
        accessorKey: "SubOfMainDetailLocation",
        header: "Sub dari Main",
    },
];