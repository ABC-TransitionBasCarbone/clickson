import { EmissionFactor } from "./EmissionFactor";

export interface Emission {
    id?: string;
    value: number;
    efValue?: number;
    total: number;
    idSessionEmissionSubCategory?: string;
    depreciationPeriod?: number;
    label?: string;
    type?: string;
    unit?: string;
    uncertainty?: number;
    idEmissionFactor?: string;
    emissionFactor: EmissionFactor;
}
