'use server'

import { prismaClient } from '@/db/client'
import { getEmissionCategoriesIdLanguage, getEmissionSubCategoriesIdLanguage } from '@/db/emissions'
import {
  createSessionInDb,
  getSessionCategoryById,
  getSessionsBySchoolId,
  toggleSessionCategoryLockInDb,
  toggleSessionLockInDb,
  updateSessionInDb,
} from '@/db/session'
import { SessionEmissionCategories, SessionEmissions, SessionStudents } from '@prisma/client'

export async function getSessions(idSchool: string | null | undefined) {
  return await getSessionsBySchoolId(idSchool)
}

export async function createSession(id: string, name?: string) {
  const year = new Date().getFullYear()
  if (!id || !name || !year) {
    throw new Error('Missing required fields')
  }

  // Fetch emission categories and subcategories in parallel
  const [emissionCategories, emissionSubCategories] = await Promise.all([
    getEmissionCategoriesIdLanguage(id),
    getEmissionSubCategoriesIdLanguage(id),
  ])

  if (!emissionCategories[0] || !emissionSubCategories[0]) {
    throw new Error('Failed to fetch emission categories or subcategories')
  }

  return await createSessionInDb(id, name, year, emissionCategories, emissionSubCategories)
}

export async function getSessionCategoryWithId(idSessionCategory: string, idLang: number) {
  return await getSessionCategoryById(idSessionCategory, idLang)
}

export async function modifySession(session: SessionStudents): Promise<string> {
  await updateSessionInDb(session.id, { name: session.name, year: session.year })
  return session.id
}

export async function lockedStudentSession(session: SessionStudents): Promise<SessionStudents> {
  const updatedSession = await toggleSessionLockInDb(session.id, !session.locked)
  return updatedSession
}

export async function lockedSessionCategory(
  idSessionEmissionCategory: string,
  locked: boolean,
): Promise<SessionEmissionCategories> {
  return await toggleSessionCategoryLockInDb(idSessionEmissionCategory, locked)
}

export async function createSessionEmission(data: SessionEmissions) {
  console.log('Creating session emission with data:', data)
  return await prismaClient.sessionEmissions.create({
    data: {
      value: data.value,
      total: data.total,
      label: data.label,
      type: data.type,
      unit: data.unit,
      sessionEmissionSubCategory: {
        connect: { id: data.idSessionEmissionSubCategory },
      },
      emissionFactor: {
        connect: { id: data.idEmissionFactor },
      },
    },
  })
}

export async function deleteSessionEmission(id: string): Promise<SessionEmissions> {
  return await prismaClient.sessionEmissions.delete({
    where: { id },
  })
}
