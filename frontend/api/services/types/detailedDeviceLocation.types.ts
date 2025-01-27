/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Response } from "../types/commonResponses.types";


export namespace ApiEndpoint {
    export namespace V1 {
        export const DetailedDeviceLocations = {
            Segment: 'v1/detaileddevicelocations'
        };
        export const DetailedDeviceLocation = {
            Segment: 'v1/detaileddevicelocation'
        };
        export const ExportToExcel = {
            Segment: 'v1/detaileddevicelocations/exporttoexcel'
        };
        export const LookupAll = {
            Segment: 'v1/detaileddevicelocations/lookup'
        }
    }
}

export interface DetailedDeviceLocationBase {
    NameDetailLoation: string;
    MainDetailLocation: string;
    SubOfMainDetailLocation: string;
    DeviceLocationId: string;
}

export interface DetailedDeviceLocationDto extends DetailedDeviceLocationBase {
    id: string;
    NameDeviceLocation: string;
    DataUnitId: string;
    NameUnit: string;
}

export interface GetDetailedDeviceLocationsDetailedDeviceLocation extends Response, DetailedDeviceLocationDto {
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export class CreateDetailedDeviceLocationRequest {
    NameDetailLoation: string;
    MainDetailLocation: string | undefined;
    SubOfMainDetailLocation: string | undefined;
    DeviceLocationId: string;
    [key: string]: any;

    constructor(
        NameDetailLoation: string, 
        MainDetailLocation: string, 
        SubOfMainDetailLocation: string, 
        DeviceLocationId: string
    ) {
        this.NameDetailLoation = NameDetailLoation;
        this.MainDetailLocation = MainDetailLocation;
        this.SubOfMainDetailLocation = SubOfMainDetailLocation;
        this.DeviceLocationId = DeviceLocationId;
    }
}

export class UpdateDetailedDeviceLocationRequest {
    id: string;
    NameDetailLoation: string | undefined;
    MainDetailLocation: string | undefined;
    SubOfMainDetailLocation: string | undefined;
    DeviceLocationId: string | undefined;
    constructor(id: string, NameDetailLoation: string, MainDetailLocation: string, SubOfMainDetailLocation: string, DeviceLocationId: string) {
        this.id = id;
        this.NameDetailLoation = NameDetailLoation;
        this.MainDetailLocation = MainDetailLocation;
        this.SubOfMainDetailLocation = SubOfMainDetailLocation;
        this.DeviceLocationId = DeviceLocationId;
    }
}

const emptyDetailedDeviceLocation: DetailedDeviceLocationBase = {
    NameDetailLoation: '',
    MainDetailLocation: '',
    SubOfMainDetailLocation: '',
    DeviceLocationId: ''
};

export { emptyDetailedDeviceLocation };

export class GetLookupDetailedDeviceLocationsByDeviceLocationRequest {
    searchText: string | undefined;
    DeviceLocationId: string | undefined;
    constructor(
        DeviceLocationId: string,
        searchText: string
    ) {
        this.DeviceLocationId = DeviceLocationId;
        this.searchText = searchText;
    }
}

export interface GetLookupDetailedDeviceLocationsByDeviceLocationResponse {
    id: string;
    NameDetailLoation: string;
    MainDetailLocation: string;
    SubOfMainDetailLocation: string;
    DeviceLocationId: string;
    NameDeviceLocation: string;
    DataUnitId: string;
    NameUnit: string;
}