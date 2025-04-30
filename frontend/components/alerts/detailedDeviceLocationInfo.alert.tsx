"use client";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { InfoIcon } from "lucide-react";
import Collapsible from "@/components/collapsible";

const DetailedDeviceLocationInfo: React.FC = () => {
    return (
        <Collapsible open={true} title="Informasi Detail Lokasi Perangkat">
            <Alert className="flex flex-col items-start justify-start rounded-md border-2 border-gray-200 bg-gray-50 p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <InfoIcon className="size-4" />
                <AlertTitle className="pb-2 pt-1"><b>Informasi</b></AlertTitle>
                <AlertDescription>
                    <p>Detail Lokasi Perangkat adalah detail bagian wilayah atau Sub lokasi dari Sub Lokasi Kerja.</p>
                    <p>Misalnya di dalam Lokasi Kerja <b>Kantor Pusat</b> terdapat <b>Gedung Direktur</b>. Ini disebut <b>Detail Lokasi Kerja</b> atau Sub dari Lokasi Kerja</p>
                    <p>Di dalam Sub dari Lokasi Kerja <b>Gedung Direktur</b>, terdapat <b>Lantai 3</b>. Ini disebut <b>Detail Lokasi Perangkat</b> atau Sub dari Detail Lokasi Kerja.</p>
                    <p>Di dalam Detail Lokasi Perangkat <b>Lantai 3</b> terdapat <b>Ruang HC</b>. Ini disebut <b>Main</b> atau Sub dari Detail Lokasi Perangkat.</p>
                    <p>Di dalam Main <b>Ruang HC</b> terdapat <b>Ruang Manager HC</b>. Ini disebut <b>Sub dari Main</b> atau Sub Lokasi dari Sub Lokasi-nya Detail Lokasi Perangkat.</p>
                </AlertDescription>
            </Alert>
        </Collapsible>
    );
}

export default DetailedDeviceLocationInfo;