"use client";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { InfoIcon } from "lucide-react";
import Collapsible from "@/components/collapsible";

const DeviceLocationInfo: React.FC = () => {
    return (
        <Collapsible open={true} title="Informasi Detail Lokasi Kerja">
            <Alert>
                <InfoIcon className="size-4" />
                <AlertTitle className="pb-2 pt-1"><b>Informasi</b></AlertTitle>
                <AlertDescription>
                    <p>Lokasi Utama adalah bagian wilayah dari Lokasi Kerja atau bisa disebut <b>Detail Lokasi Kerja</b>.</p>
                    <p>Misalnya di dalam Lokasi Kerja <b>Kantor Pusat</b> terdapat <b>Gedung Direktur</b> dan <b>Kantor Security</b>.</p>
                </AlertDescription>
            </Alert>
        </Collapsible>
    );
};

export default DeviceLocationInfo;