export interface GetDataUnitsDataUnit extends Response{
    id: string;
    NameUnit: string;
    Plant?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface Response {
    timestamp: Date;
}