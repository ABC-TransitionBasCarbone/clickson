import {
  Comments,
  EmissionCategories,
  EmissionFactors,
  EmissionSubCategories,
  SessionEmissions,
  SessionEmissionSubCategories,
} from '@prisma/client'
import { DataToFill } from './DataToFill'

export interface SessionSubCategory {
  emissionCategory: EmissionCategories & {
    emissionSubCategories: (EmissionSubCategories & {
      emissionFactors: EmissionFactors[]
      dataToFill?: DataToFill
      locked: boolean
      sessionEmissionSubCategories: (SessionEmissionSubCategories & {
        sessionEmissions: SessionEmissions[]
        comments: Comments[]
      })[]
    })[]
  }
}
