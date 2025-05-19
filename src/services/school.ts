import { prismaClient } from '@/db/client'
import { getSchoolAdminByEmail } from '@/db/schoolAdmin'
import { getSchoolById } from '@/db/schools'

export const getSchoolByAdminEmail = async (email: string | null) => {
  const schoolAdmin = email ? await getSchoolAdminByEmail(email) : null
  if (schoolAdmin?.schoolId) {
    return getSchoolById(schoolAdmin.schoolId)
  }
  return null
}

export async function updateSchoolById(data: {
  id: string
  state?: string
  name?: string
  townName?: string
  postalCode?: string
  studentCount?: number
  staffCount?: number
  establishmentYear?: number
  adress?: string
}) {
  try {

    const school = await prismaClient.schools.update({
      where: { id: data.id },
      data
    })

    return school
  } catch (error) {
    throw error
  }
}

export async function getSchool(id: string) {
  try {
    const school = await prismaClient.schools.findUnique({
      where: { id }
    })
    return school
  } catch (error) {
    throw error
  }
}
