import { Prisma } from '@prisma/client'
import { NestedSessionEmissionCategory } from './NestedSessionEmissionCategory'

// Define the Prisma type for NestedSessionStudents
const nestedSessionStudentsWithRelations = Prisma.validator<Prisma.SessionStudentsDefaultArgs>()({
  include: {
    school: true,
  },
})

export type NestedSessionStudents = Prisma.SessionStudentsGetPayload<typeof nestedSessionStudentsWithRelations> & {
  sessionEmissionCategories: NestedSessionEmissionCategory[]
}
