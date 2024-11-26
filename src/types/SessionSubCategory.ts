import { DataToFill } from "./DataToFill"
import { Emission } from "./Emission"
import { Comment } from "./Comment"
import { SubCategory } from "./SubCategory"

export interface SessionSubCategory {
    id: string
    idSessionEmissionCategory: string
    idEmissionSubCategory: number
    locked: boolean
    sessionEmissions: Emission[]
    emissionSubCategory: SubCategory
    dataToFill?: DataToFill
    comments?: Comment[]
}
