import { Category } from "./Category";
import { SessionSubCategory } from "./SessionSubCategory";

export interface SessionCategory {
    id: string;
    idEmissionCategory: number;
    idSessionStudent?: string;
    locked: boolean;
    sessionEmissionSubCategories: SessionSubCategory[]
    emissionCategory: Category
}
