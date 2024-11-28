import { SubCategory } from "./SubCategory";

export interface Category {
    id: number;
    idEmissionCategory?: number;
    idSessionEmissionCategory: string;
    label: string;
    detail: string;
    locked: boolean;
    subCategories: SubCategory[];
}
