import { EmissionFactor } from "./EmissionFactor";

export interface SubCategory {
    id: number;
    idEmissionCategory: number;
    idEmissionSubCategory: number;
    idLanguage?: number;
    label: string;
    detail: string;
    idSessionSubCategory: string;
    emissionFactors: EmissionFactor[];
}
