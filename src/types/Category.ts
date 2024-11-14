import { SubCategory } from "./SubCategory";

export interface Category {
    id: number;
    idEmissionCategorie?: number;
    idSessionEmissionCategorie?: string;
    label: string;
    detail: string;
    subCategories: SubCategory[];
}
