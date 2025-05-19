import { prismaClient } from './client'

const rights = [
  { key: 0, label: 'energy', advanced: false },
  { key: 1, label: 'travel', advanced: false },
  { key: 2, label: 'foodService', advanced: false },
  { key: 3, label: 'supplies', advanced: false },
  { key: 4, label: 'fixedAssets', advanced: false },
  { key: 5, label: 'travel', advanced: false },
  { key: 6, label: 'energy', advanced: true },
  { key: 7, label: 'travel', advanced: true },
  { key: 8, label: 'foodService', advanced: true },
  { key: 9, label: 'supplies', advanced: true },
  { key: 10, label: 'fixedAssets', advanced: true },
  { key: 11, label: 'travel', advanced: true },
]

export const getSessionsBySchoolId = (id: string | null | undefined) =>
  id ? prismaClient.sessionStudents.findMany({
    where: { idSchool: id },
    include: {
      groups: {
        where: {
          deleted: false
        }
      },
    }
  }) : null

export const createSessionInDb = async (
  idSchool: string,
  name: string,
  year: number,
  emissionCategories: any[],
  emissionSubCategories: any[],
) => {
  console.log('createSessionInDb', { idSchool, name, year, emissionCategories, emissionSubCategories })

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

      console.log('sessionEmissionSubCategoriesMap', sessionEmissionSubCategoriesMap)

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

export const getSessionSubCategoriesByCategory = async (idSessionEmissionCategory: string) => {
  return await prismaClient.sessionEmissionSubCategories.findMany({
    where: { idSessionEmissionCategory },
  })
}
