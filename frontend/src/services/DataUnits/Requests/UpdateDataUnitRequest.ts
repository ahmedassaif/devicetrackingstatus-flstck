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