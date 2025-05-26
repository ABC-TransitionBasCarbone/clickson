'use server'

import { prismaClient } from '@/db/client'

export async function createComment(idEmissionSubCategory: string, comment: string) {
  try {
    const commentToReturn = await prismaClient.comments.create({
      data: { idEmissionSubCategory, comment },
    })
    return commentToReturn
  } catch (error) {
    throw new Error('Failed to create comment')
  }
}

export async function deleteComment(id: string) {
  try {
    const comment = await prismaClient.comments.delete({ where: { id } })
    return comment
  } catch (error) {
    throw new Error('Failed to delete comment')
  }
}
