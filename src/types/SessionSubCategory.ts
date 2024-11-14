import { DataToFill } from "./DataToFill"
import { Emission } from "./Emission"
import { SubCategory } from "./SubCategory"

export interface SessionSubCategory {
    id: string
    idSessionEmissionCategorie: string
    idEmissionSubCategorie: number,
    sessionEmissions: Emission[]
    emissionSubCategories: SubCategory
    dataToFill?: DataToFill
}
