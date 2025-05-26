import { Prisma } from '@prisma/client'

// Define the nested include using Prisma.validator
export const nestedEmissionCategoryInclude = Prisma.validator<Prisma.EmissionCategoriesInclude>()({
  emissionSubCategories: {
    include: {
      emissionFactors: true,
    },
  },
})

// Infer the type from the include
export type NestedEmissionCategory = Prisma.EmissionCategoriesGetPayload<{
  include: typeof nestedEmissionCategoryInclude
}>
