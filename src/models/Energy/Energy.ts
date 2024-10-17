import { getEmissionFactor, getIncertitude } from "@/src/helpers/emissionfactor";

export class Energy {
    id: string;
    category: string;
    type: string;
    value: number;
    emission: number;
    uncertainty: number;

    constructor(id: string, type: string, value: number, category: string) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.value = value;
        this.emission = this.calculEmission(value, category);
        this.uncertainty = this.calculUncertainty(value, category);
    }

    calculEmission(value: number, category: string): number {
        // TODO test it
        return getEmissionFactor(category) * value;
    }

    calculUncertainty(value: number, category: string): number {
        // TODO test it
        return getIncertitude(category) * value; 
    }
}
