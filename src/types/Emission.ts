import { EmissionFactor } from "./EmissionFactor";

export interface Emission {
    id?: string;
    value: number;
    total?: number;
    idSessionEmissionSubCategory?: string;
    idEmissionFactor?: number;
    emissionFactor: EmissionFactor;
}
