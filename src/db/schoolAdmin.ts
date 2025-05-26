import { prismaClient } from './client'

export const getSchoolAdminByEmail = (email: string | null) =>
  email ? prismaClient.schoolAdmins.findFirst({ where: { adminUsername: email } }) : null
