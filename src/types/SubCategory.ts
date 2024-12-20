import { EmissionFactor } from "./EmissionFactor";

export interface SubCategory {
    id: number;
    idEmissionCategorie: number;
    idLanguage?: number;
    label: string;
    detail: string;
    idSessionSubCategory: string;
    emissionFactors: EmissionFactor[];
}
