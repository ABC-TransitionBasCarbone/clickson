import { Category } from "./Category";
import { SessionSubCategory } from "./SessionSubCategory";

export interface SessionCategory {
    id: string;
    idEmissionCategory?: number;
    idSessionStudent?: string;
    sessionEmissionSubCategories: SessionSubCategory[]
    emissionCategory: Category
}
