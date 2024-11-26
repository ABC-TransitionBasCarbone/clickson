import { DataToFill } from "./DataToFill"
import { Emission } from "./Emission"
import { Comment } from "./Comment"
import { SubCategory } from "./SubCategory"

export interface SessionSubCategory {
    id: string
    idSessionEmissionCategorie: string
    idEmissionSubCategory: number,
    sessionEmissions: Emission[]
    emissionSubCategory: SubCategory
    dataToFill?: DataToFill
    comments?: Comment[]
}
