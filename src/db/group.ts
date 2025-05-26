import { prismaClient } from './client'

export async function getGroupWithDetails(id: string) {
  return await prismaClient.groups.findFirst({
    where: { id },
    include: {
      sessionStudent: {
        include: {
          sessionEmissionCategories: {
            orderBy: [
              {
                idEmissionCategory: 'asc',
              },
            ],
            include: {
              sessionEmissionSubCategories: {
                include: {
                  sessionEmissions: true,
                },
              },
              emissionCategory: true,
            },
          },
          school: true,
        },
      },
    },
  })
}
