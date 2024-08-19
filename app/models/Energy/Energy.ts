export class Energy {
    id: string;
    category: string;
    type: string;
    value: number;
    emission: number;
    uncertainty: number;

    constructor(id: string,type: string, value: number, category:string) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.value = value;
        this.emission = this.calculEmission(value, category);
        this.uncertainty = this.calculUncertainty(value, category);
    }

    calculEmission(value:number, category:string): number {
        // Add Emission calculation
        return 0.12; // default value
    }

    calculUncertainty(value:number, category:string): number {
        // Add uncertainty calculation
        return 0; // default value
    }
}