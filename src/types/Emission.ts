import { EmissionFactor } from "./EmissionFactor";

export interface Emission {
    id?: string;
    value: number;
    idSessionSubCategorie?: string;
    idEmissionFactor?: number;
    emissionFactor: EmissionFactor;
}
