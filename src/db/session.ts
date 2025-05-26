import { rights } from '@/constants/rights'
import { prismaClient } from './client'

export const getSessionsBySchoolId = (id: string | null | undefined) =>
  id
    ? prismaClient.sessionStudents.findMany({
        where: { idSchool: id },
        include: {
          groups: {
            where: {
              deleted: false,
            },
          },
        },
      })
    : null

export const createSessionInDb = async (
  idSchool: string,
  name: string,
  year: number,
  emissionCategories: any[],
  emissionSubCategories: any[],
) => {
  try {
    return await prismaClient.$transaction(async (tx) => {
      const createdSession = await tx.sessionStudents.create({ data: { idSchool, name, year } })

      await tx.sessionEmissionCategories.createMany({
        data: emissionCategories.map((categorie) => ({
          idSessionStudent: createdSession.id,
          idEmissionCategory: categorie.id,
        })),
      })

      const sessionEmissionCategories = await tx.sessionEmissionCategories.findMany({
        where: { idSessionStudent: createdSession.id },
      })

      const sessionEmissionSubCategoriesMap = emissionSubCategories.map((subCategorie) => ({
        idSessionEmissionCategory:
          sessionEmissionCategories.find(
            (categorie) => categorie.idEmissionCategory === subCategorie.idEmissionCategory,
          )?.id || '',
        idEmissionSubCategory: subCategorie.idEmissionSubCategory,
      }))
      if (sessionEmissionSubCategoriesMap.length > 0) {
        await tx.sessionEmissionSubCategories.createMany({ data: sessionEmissionSubCategoriesMap })
      }

      const adminGroup = await tx.groups.create({
        data: {
          idSchool,
          idSessionStudent: createdSession.id,
          name: `Admin ${name}`,
          year,
          rights: rights.filter((r) => r.advanced).map((r) => r.key),
        },
      })

      if (sessionEmissionCategories.length < 0 || sessionEmissionCategories.length === 0) {
        throw new Error(
          'No categories found for the session. Aborting transaction.' + JSON.stringify({ createdSession }),
        )
      }

      return { ...createdSession, groups: [adminGroup] }
    })
  } catch (error) {
    console.error('Error in createSessionInDb:', error)
    throw error
  }
}

export const updateSessionInDb = async (id: string, data: { name?: string; year?: number }) => {
  return await prismaClient.sessionStudents.update({
    where: { id },
    data,
  })
}

export const toggleSessionLockInDb = async (id: string, locked: boolean) => {
  return await prismaClient.sessionStudents.update({
    where: { id },
    data: { locked },
  })
}

export const toggleSessionCategoryLockInDb = async (idSessionEmissionCategory: string, locked: boolean) => {
  return await prismaClient.sessionEmissionCategories.update({
    where: { id: idSessionEmissionCategory },
    data: { locked },
  })
}

export const getSessionCategoryById = async (id: string, idLanguage: number) => {
  return await prismaClient.sessionEmissionCategories.findFirst({
    where: { id },
    include: {
      emissionCategory: {
        include: {
          emissionSubCategories: {
            where: { idLanguage },
            include: {
              emissionFactors: {
                where: { idLanguage },
              },
              sessionEmissionSubCategories: {
                include: {
                  sessionEmissions: true,
                  comments: true,
                },
              },
            },
          },
        },
      },
    },
  })
}
