'use server'

import { prismaClient } from '@/db/client'
import { EmissionFactors, Prisma } from '@prisma/client'

export async function createEmissionSubCategory(data: {
  label: string
  idLanguage: number
  idEmissionCategory: number
}) {
  const alreadyCreated = await prismaClient.emissionSubCategories.findFirst({
    where: {
      label: data.label,
      idLanguage: data.idLanguage,
    },
  })
  if (alreadyCreated) throw new Error('Category already exists')

  const lastEmissionSubCategory = await prismaClient.emissionSubCategories.findFirst({
    orderBy: { id: 'desc' },
  })
  const id = lastEmissionSubCategory ? lastEmissionSubCategory.id + 1 : 1

  return prismaClient.emissionSubCategories.create({
    data: {
      id: id,
      label: data.label,
      detail: '',
      idEmissionCategory: data.idEmissionCategory,
      idEmissionSubCategory: id,
      idLanguage: data.idLanguage,
    },
  })
}

export async function createEmissionCategory(data: { label: string; idLanguage: number; idEmissionCategory: number }) {
  const alreadyCreated = await prismaClient.emissionCategories.findFirst({
    where: {
      label: data.label,
      idLanguage: data.idLanguage,
    },
  })
  if (alreadyCreated) throw new Error('Category already exists')

  const lastEmissionCategory = await prismaClient.emissionCategories.findFirst({
    orderBy: { id: 'desc' },
  })
  const id = lastEmissionCategory ? lastEmissionCategory.id + 1 : 1

  return prismaClient.emissionCategories.create({
    data: {
      id: id,
      idEmissionCategory: data.idEmissionCategory,
      label: data.label,
      detail: '',
      idLanguage: data.idLanguage,
    },
  })
}

export async function updateEmissionSubCategory(data: { id: number; label: string; detail: string }) {
  return prismaClient.emissionSubCategories.update({
    where: { id: data.id },
    data: {
      label: data.label,
      detail: data.detail,
    },
  })
}

export async function deleteEmissionSubCategory(id: number) {
  return prismaClient.emissionSubCategories.delete({
    where: { id },
  })
}

export async function updateEmissionCategory(data: { id: number; label: string; detail: string }) {
  return prismaClient.emissionCategories.update({
    where: { id: data.id },
    data: {
      label: data.label,
      detail: data.detail,
    },
  })
}

export async function getEmissionCategories(idLanguage: number) {
  return prismaClient.emissionCategories.findMany({
    where: { idLanguage },
    include: {
      emissionSubCategories: {
        include: {
          emissionFactors: true,
        },
        orderBy: [{ id: 'asc' }],
      },
    },
  })
}

export async function getEmissionSubCategoriesByLangId(idLanguage: number) {
  return prismaClient.emissionSubCategories.findMany({
    where: { idLanguage },
    include: {
      emissionFactors: true,
    },
  })
}

export async function getEmissionFactors(idEmissionSubCategory: number) {
  return prismaClient.emissionFactors.findMany({
    where: {
      idEmissionSubCategory,
    },
  })
}

export async function getAllEmissionFactors() {
  return prismaClient.emissionCategories.findMany({
    include: {
      emissionSubCategories: {
        include: {
          emissionFactors: true,
        },
        orderBy: [{ id: 'asc' }],
      },
    },
    orderBy: [{ idLanguage: 'asc' }, { id: 'asc' }],
  })
}

export async function deleteEmissionFactor(id: number) {
  return prismaClient.emissionFactors.delete({ where: { id } })
}

export async function updateEmissionFactor(data: EmissionFactors) {
  return prismaClient.emissionFactors.update({
    where: { id: data.id },
    data: {
      value: data.value,
      uncertainty: data.uncertainty,
      depreciationPeriod: data.depreciationPeriod,
      label: data.label,
      unit: data.unit,
      type: data.type,
    },
  })
}

export async function createEmissionFactor(data: Prisma.EmissionFactorsCreateInput) {
  return prismaClient.emissionFactors.create({
    data,
  })
}
