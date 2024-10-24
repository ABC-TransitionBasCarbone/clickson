import { DataToFill } from "./DataToFill";

export interface SubCategory {
    id: number;
    id_emission_categorie: number;
    id_language?: number;
    label: string;
    detail: string;
    dataToFill?: DataToFill;
}
