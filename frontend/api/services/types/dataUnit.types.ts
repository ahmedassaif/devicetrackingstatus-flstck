/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Response } from "../types/commonResponses.types";
export namespace ApiEndpoint {
    export namespace V1 {
            export const DataUnits = {
                Segment: 'v1/dataUnits'
            };
            export const DataUnit = {
                Segment: 'v1/dataUnit'
            };
            export const ExportToExcel = {
                Segment: 'v1/exportDataUnitsToExcel'
            };
            export const LookupAll = {
                Segment: 'v1/getLookupAllDataUnits'
            }
        }
    }

export interface DataUnitBase {
    NameUnit: string;
    Plan?: string;
}
export interface DataUnitDto extends DataUnitBase {
    id: string;
} 

export interface GetDataUnitsDataUnit extends Response, DataUnitDto{
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export class CreateDataUnitRequest{
    NameUnit: string;
    Plan: string | undefined;
    [key: string]: any;

    constructor(NameUnit: string, Plan: string){
        this.NameUnit = NameUnit;
        this.Plan = Plan;
    }
}

export class UpdateDataUnitRequest{
    id: string | undefined;
    NameUnit: string | undefined;
    Plan: string | undefined;
    [key: string]: any;

    constructor(id: string,NameUnit: string, Plan: string){
        this.id = id;
        this.NameUnit = NameUnit;
        this.Plan = Plan;
    }
}