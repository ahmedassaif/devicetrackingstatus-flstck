/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { GetDeviceLocationsDeviceLocation } from "@/api/services/types/deviceLocation.types";

export const columns: ColumnDef<GetDeviceLocationsDeviceLocation>[] = [
    {
        header: "Actions",
    },
    {
        accessorKey: "NameUnit",
        header: "Lokasi Kerja",
        cell: ({ row }) => row.getValue("NameUnit"),
    },
    {
        accessorKey: "NameDeviceLocation",
        header: "Lokasi Utama Perangkat",
        cell: ({ row }) => row.getValue("NameDeviceLocation"),
    }
];