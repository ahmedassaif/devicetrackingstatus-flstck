/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { GetDataUnitsDataUnit } from "@/api/services/types/dataUnit.types";

export const columns: ColumnDef<GetDataUnitsDataUnit>[] = [
    {
        header: "Actions",
    },
    {
        accessorKey: "NameUnit",
        header: "Nama Lokasi Kerja",
        cell: ({ row }) => row.getValue("NameUnit"),
    },
    {
        accessorKey: "Plan",
        header: "Kode Plan",
        cell: ({ row }) => row.getValue("Plan") || "N/A",
    }
];