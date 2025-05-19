import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createEmissionSubCategory(data: {
    label: string,
    idLanguage: number,
    idEmissionCategory: number
}) {
    const alreadyCreated = await prisma.emissionSubCategories.findFirst({
        where: {
            label: data.label,
            idLanguage: data.idLanguage
        }
    })
    if (alreadyCreated) throw new Error("Category already exists");

    const lastEmissionSubCategory = await prisma.emissionSubCategories.findFirst({
        orderBy: { id: 'desc' }
    });
    const id = lastEmissionSubCategory ? lastEmissionSubCategory.id + 1 : 1;

    return prisma.emissionSubCategories.create({
        data: {
            id: id,
            label: data.label,
            detail: "",
            idEmissionCategory: data.idEmissionCategory,
            idEmissionSubCategory: id,
            idLanguage: data.idLanguage,
        }
    });
}

export async function createEmissionCategory(data: {
    label: string,
    idLanguage: number,
    idEmissionCategory: number
}) {
    const alreadyCreated = await prisma.emissionCategories.findFirst({
        where: {
            label: data.label,
            idLanguage: data.idLanguage
        }
    })
    if (alreadyCreated) throw new Error("Category already exists");

    const lastEmissionCategory = await prisma.emissionCategories.findFirst({
        orderBy: { id: 'desc' }
    });
    const id = lastEmissionCategory ? lastEmissionCategory.id + 1 : 1;

    return prisma.emissionCategories.create({
        data: {
            id: id,
            idEmissionCategory: data.idEmissionCategory,
            label: data.label,
            detail: "",
            idLanguage: data.idLanguage
        }
    });
}

export async function updateEmissionSubCategory(data: {
    id: number,
    label: string,
    detail: string
}) {
    return prisma.emissionSubCategories.update({
        where: { id: data.id },
        data: {
            label: data.label,
            detail: data.detail,
        }
    });
}

export async function deleteEmissionSubCategory(id: number) {
    return prisma.emissionSubCategories.delete({
        where: { id }
    });
}

export async function updateEmissionCategory(data: {
    id: number,
    label: string,
    detail: string
}) {
    return prisma.emissionCategories.update({
        where: { id: data.id },
        data: {
            label: data.label,
            detail: data.detail,
        }
    });
}

export async function getEmissionCategories(idLanguage: number) {
    return prisma.emissionCategories.findMany({
        where: { idLanguage },
        include: {
            emissionSubCategories: {
                include: {
                    emissionFactors: true
                },
                orderBy: [
                    { id: 'asc' }
                ]
            }
        },
    });
}

export async function getEmissionSubCategoriesByLangId(idLanguage: number) {
    return prisma.emissionSubCategories.findMany({
        where: { idLanguage },
        include: {
            emissionFactors: true
        }
    });
}

export async function getEmissionFactors(idEmissionSubCategory: number) {
    return prisma.emissionFactors.findMany({
        where: {
            idEmissionSubCategory
        }
    });
}

export async function getAllEmissionFactors() {
    return prisma.emissionCategories.findMany({
        include: {
            emissionSubCategories: {
                include: {
                    emissionFactors: true
                },
                orderBy: [
                    { id: 'asc' }
                ]
            }
        },
        orderBy: [
            { idLanguage: 'asc' },
            { id: 'asc' }
        ]
    });
}

export async function deleteEmissionFactor(id: number) {
    return prisma.emissionFactors.delete({ where: { id } });
}

export async function updateEmissionFactor(data: {
    id: number,
    value: number,
    uncertainty: number,
    depreciationPeriod: number,
    label: string,
    unit: string,
    type: string
}) {
    return prisma.emissionFactors.update({
        where: { id: data.id },
        data: {
            value: data.value,
            uncertainty: data.uncertainty,
            depreciationPeriod: data.depreciationPeriod,
            label: data.label,
            unit: data.unit,
            type: data.type,
        }
    });
}

export async function createEmissionFactor(data: {
    value: number,
    uncertainty: number,
    depreciationPeriod: number,
    label: string,
    unit: string,
    type: string,
    idEmissionSubCategory: number,
    idLanguage: number
}) {
    const lastEmissionFactor = await prisma.emissionFactors.findFirst({
        orderBy: { id: 'desc' }
    });
    const id = lastEmissionFactor ? lastEmissionFactor.id + 1 : 1;

    return prisma.emissionFactors.create({
        data: {
            id: id,
            value: data.value,
            uncertainty: data.uncertainty,
            depreciationPeriod: data.depreciationPeriod,
            label: data.label,
            unit: data.unit,
            type: data.type,
            idEmissionSubCategory: data.idEmissionSubCategory,
            idLanguage: data.idLanguage
        }
    });
}
