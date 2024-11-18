import { Category } from "./Category";
import { SessionSubCategory } from "./SessionSubCategory";

export interface SessionCategory {
    id: string;
    idEmissionCategorie?: number;
    idSessionStudent?: string;
    sessionSubCategories: SessionSubCategory[]
    emissionCategorie: Category
}
