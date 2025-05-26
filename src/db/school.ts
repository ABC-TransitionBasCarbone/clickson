import { prismaClient } from './client'

export const getSchoolById = (id: string | null) => (id ? prismaClient.schools.findFirst({ where: { id } }) : null)
