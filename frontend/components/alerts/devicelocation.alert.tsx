"use client";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { InfoIcon } from "lucide-react";

const DeviceLocationInfo: React.FC = () => {
    return (
        <Alert>
            <InfoIcon className="size-4" />
            <AlertTitle className="pb-2 pt-1"><b>Informasi</b></AlertTitle>
            <AlertDescription>
                <p>Lokasi Utama adalah bagian wilayah dari Lokasi Kerja.</p>
                <p>Misalnya di dalam Lokasi Kerja <b>Kantor Pusat</b> terdapat Lokasi Utama <b>Gedung Direktur</b> dan <b>Kantor Security</b>.</p>
            </AlertDescription>
        </Alert>
    );
};

export default DeviceLocationInfo;