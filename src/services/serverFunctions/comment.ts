import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createComment(idEmissionSubCategory: string, comment: string) {
    try {
        const commentToReturn = await prisma.comments.create({
            data: { idEmissionSubCategory, comment }
        })
        return commentToReturn
    } catch (error) {
        throw new Error('Failed to create comment')
    }
}

export async function deleteComment(id: string) {
    try {
        const comment = await prisma.comments.delete({ where: { id } })
        return comment
    } catch (error) {
        throw new Error('Failed to delete comment')
    }
}
