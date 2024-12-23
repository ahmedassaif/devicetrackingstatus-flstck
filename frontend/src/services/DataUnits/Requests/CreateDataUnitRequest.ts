export class CreateDataUnitRequest{
    NameUnit: string | undefined;
    Plan: string | undefined;
    [key: string]: any;

    constructor(NameUnit: string, Plan: string){
        this.NameUnit = NameUnit;
        this.Plan = Plan;
    }
}