import { prismaClient } from './client'

export const getEmissionCategoriesIdLanguage = (id: string | null | undefined) =>
  prismaClient.emissionCategories.findMany({ where: { idLanguage: 1 } })

export const getEmissionSubCategoriesIdLanguage = (id: string | null | undefined) =>
  prismaClient.emissionSubCategories.findMany({ where: { idLanguage: 1 } })
