import { Groups, PrismaClient, SessionStudents } from '@prisma/client';
const prisma = new PrismaClient();

type UpdateGroupInput = {
    id: string;
    idSchool?: string;
    name?: string;
    year?: number;
    archived?: boolean;
    deleted?: boolean;
    rights?: any;
};

async function createGroup(name: string, session: SessionStudents) {
    try {
        const group = await prisma.groups.create({
            data: { name, idSchool: session.idSchool, idSessionStudent: session.id }
        });
        return group;
    } catch (error) {
        throw { error: 'Failed to create group', details: error };
    }
}

async function updateGroup(data: UpdateGroupInput) {
    const { id, ...updateData } = data;
    try {
        const group = await prisma.groups.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date()
            }
        });
        return group;
    } catch (error) {
        throw { error: 'Failed to update group', details: error };
    }
}

async function getGroup(idGroup: string) {
    try {
        const group = await prisma.groups.findFirstOrThrow({
            where: { id: idGroup },
            include: {
                sessionStudent: {
                    include: {
                        sessionEmissionCategories: {
                            orderBy: [
                                {
                                    idEmissionCategory: 'asc',
                                }
                            ],
                            include: {
                                sessionEmissionSubCategories: {
                                    include: {
                                        sessionEmissions: true
                                    }
                                },
                                emissionCategory: true
                            }
                        },
                        school: true,
                    }
                }
            }
        });
        return group;
    } catch (error) {
        throw { error: 'Failed to get group', details: error };
    }
}

async function deleteGroupInDatabase(group: Groups) {
    try {
        await prisma.groups.delete({
            where: { id: group.id }
        });
        return group.id;
    } catch (error) {
        throw { error: 'Failed to delete group', details: error };
    }
}

export { createGroup, updateGroup, getGroup, deleteGroupInDatabase };
