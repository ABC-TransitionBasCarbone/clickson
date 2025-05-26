'use server'

import { prismaClient } from '@/db/client'
import { getGroupWithDetails } from '@/db/group'
import { Groups, SessionStudents } from '@prisma/client'

type UpdateGroupInput = {
  id: string
  idSchool?: string
  name?: string
  year?: number
  archived?: boolean
  deleted?: boolean
  rights?: any
}

async function createGroup(name: string, session: SessionStudents) {
  try {
    const group = await prismaClient.groups.create({
      data: { name, idSchool: session.idSchool, idSessionStudent: session.id },
    })
    return group
  } catch (error) {
    throw { error: 'Failed to create group', details: error }
  }
}

async function updateGroup(data: UpdateGroupInput) {
  const { id, ...updateData } = data
  try {
    const group = await prismaClient.groups.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    })
    return group
  } catch (error) {
    throw { error: 'Failed to update group', details: error }
  }
}

async function getGroup(idGroup: string) {
  try {
    const group = await getGroupWithDetails(idGroup)
    return group
  } catch (error) {
    throw { error: 'Failed to get group', details: error }
  }
}

async function deleteGroupInDatabase(group: Groups) {
  try {
    await prismaClient.groups.delete({
      where: { id: group.id },
    })
    return group.id
  } catch (error) {
    throw { error: 'Failed to delete group', details: error }
  }
}

export { createGroup, deleteGroupInDatabase, getGroup, updateGroup }
