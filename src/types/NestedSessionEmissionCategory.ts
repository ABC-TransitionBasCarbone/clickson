import { Prisma } from '@prisma/client'

// Define the Prisma type for NestedSessionEmissionCategory
export const nestedSessionEmissionCategoryWithRelations =
  Prisma.validator<Prisma.SessionEmissionCategoriesDefaultArgs>()({
    include: {
      sessionEmissionSubCategories: {
        include: {
          sessionEmissions: true,
        },
      },
      emissionCategory: true,
    },
  })

export type NestedSessionEmissionCategory = Prisma.SessionEmissionCategoriesGetPayload<
  typeof nestedSessionEmissionCategoryWithRelations
>
