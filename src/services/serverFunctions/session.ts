'use server'

import { getEmissionCategoriesIdLanguage, getEmissionSubCategoriesIdLanguage } from '@/db/emissions'
import {
    createSessionInDb,
    getSessionsBySchoolId,
    getSessionSubCategoriesByCategory,
    toggleSessionCategoryLockInDb,
    toggleSessionLockInDb,
    updateSessionInDb,
} from '@/db/session'
import { SessionEmissionCategories, SessionStudents } from '@prisma/client'

export async function getSessions(idSchool: string | null | undefined) {
    return await getSessionsBySchoolId(idSchool)
}

export async function createSession(idSchool: string, name?: string) {
    const year = new Date().getFullYear()
    if (!idSchool || !name || !year) {
        throw new Error('Missing required fields')
    }

    // Fetch emission categories and subcategories in parallel
    const [emissionCategories, emissionSubCategories] = await Promise.all([
        getEmissionCategoriesIdLanguage(idSchool),
        getEmissionSubCategoriesIdLanguage(idSchool),
    ])

    return await createSessionInDb(idSchool, name, year, emissionCategories, emissionSubCategories)
}

export async function getSessionSubCategoriesWithIdSessionCategory(idSessionCategory: string) {
    return await getSessionSubCategoriesByCategory(idSessionCategory)
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
