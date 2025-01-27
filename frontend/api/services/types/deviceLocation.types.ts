/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ApiEndpoint {
    export namespace V1 {
            export const DeviceLocations = {
                Segment: 'v1/deviceLocations'
            };
            export const DeviceLocation = {
                Segment: 'v1/deviceLocation'
            };
            export const ExportToExcel = {
                Segment: 'v1/exportDeviceLocationsToExcel'
            };
            export const LookupAll = {
                Segment: 'v1/getLookupAllDeviceLocations'
            }
        }
    }

export interface DeviceLocationBase {
    NameDeviceLocation: string;
    DataUnitId?: string;
}
export interface DeviceLocationDto extends Response, DeviceLocationBase {
    id: string;
    NameUnit: string;
    Plan: string;
} 

export interface GetDeviceLocationsDeviceLocation extends Response, DeviceLocationDto{
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export class CreateDeviceLocationRequest{
    NameDeviceLocation: string;
    DataUnitId: string | undefined;
    [key: string]: any;

    constructor(NameDeviceLocation: string, DataUnitId: string){
        this.NameDeviceLocation = NameDeviceLocation;
        this.DataUnitId = DataUnitId;
    }
}

export class UpdateDeviceLocationRequest{
    id: string | undefined;
    NameDeviceLocation: string | undefined;
    DataUnitId: string | undefined;
    [key: string]: any;

    constructor(id: string,NameDeviceLocation: string, DataUnitId: string){
        this.id = id;
        this.NameDeviceLocation = NameDeviceLocation;
        this.DataUnitId = DataUnitId;
    }
}

export class GetLookupDeviceLocationsByDataUnitRequest{
    DataUnitId: string | undefined;
    searchText: string | undefined;
    [key: string]: any;

    constructor(DataUnitId: string, searchText: string){

        this.searchText = searchText;
        this.DataUnitId = DataUnitId;
    }
}

export interface GetLookupDeviceLocationsByDataUnitResponse {
    id: string;
    NameDeviceLocation: string;
    NameUnit: string;
    Plan: string;
}

const deviceLocationFormSchema = z.object({
    NameDeviceLocation: z.string().min(1, { message: "Nama Lokasi Perangkat Wajib Diisi" }),
    DataUnitId: z.string().min(1, { message: "Lokasi Kerja harus dipilih" }),
});
const emptyDeviceLocation = { NameDeviceLocation: '', DataUnitId: ''};

export { deviceLocationFormSchema }; export { emptyDeviceLocation };