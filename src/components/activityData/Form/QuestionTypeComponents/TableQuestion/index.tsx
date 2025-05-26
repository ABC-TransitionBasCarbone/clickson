'use client'

import { createComment, deleteComment } from '@/services/serverFunctions/comment'
import { createSessionEmission, deleteSessionEmission } from '@/services/serverFunctions/session'
import { DataToFill } from '@/types/DataToFill'
import { CancelPresentationOutlined } from '@mui/icons-material'
import { CircularProgress, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import {
  Comments,
  EmissionFactors,
  EmissionSubCategories,
  SessionEmissions,
  SessionEmissionSubCategories,
} from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ConfirmationDialog from '../../../../../components/ConfirmationDialog'
import { CustomDialog } from '../../../../../components/customDialog'
import { DataInput } from '../../DataInput'
import { DataTable } from '../../DataTable'
import { CommentInput } from '../CommentInput'

interface Props {
  emissionSubCategory: EmissionSubCategories & {
    emissionFactors: EmissionFactors[]
    dataToFill?: DataToFill
    locked: boolean
    sessionEmissionSubCategories: (SessionEmissionSubCategories & {
      sessionEmissions: SessionEmissions[]
      comments: Comments[]
    })[]
  }
  schoolYear?: number | null
}

export const QuestionTypeComponent = ({ emissionSubCategory, schoolYear }: Props) => {
  const [saving, setSaving] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [open, setOpen] = useState(false)
  const [sessionSubCategory, setSessionSubCategory] = useState(emissionSubCategory)
  const t = useTranslations('category')

  const handleClose = () => {
    setOpen(false)
  }

  const addComment = async (comment: string) => {
    setLoadingData(true)
    const commentData = await createComment(sessionSubCategory.sessionEmissionSubCategories[0].id, comment)
    const updateSubCategory = sessionSubCategory.sessionEmissionSubCategories[0]

    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissionSubCategories: [
        { ...updateSubCategory, comments: updateSubCategory.comments?.concat(commentData) },
      ],
    })
    setLoadingData(false)
  }

  const handleDelete = async (emission: SessionEmissions) => {
    setLoadingData(true)
    const updateSubCategory = sessionSubCategory.sessionEmissionSubCategories[0]

    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissionSubCategories: [
        {
          ...updateSubCategory,
          sessionEmissions: updateSubCategory.sessionEmissions.filter((se) => se.id !== emission.id),
        },
      ],
    })

    await deleteSessionEmission(emission.id)
    setLoadingData(false)
  }

  const handleDeleteComment = async (comment: Comments) => {
    setLoadingData(true)
    const updateSubCategory = sessionSubCategory.sessionEmissionSubCategories[0]

    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissionSubCategories: [
        { ...updateSubCategory, comments: updateSubCategory.comments?.filter((se) => se.id !== comment.id) },
      ],
    })

    await deleteComment(comment.id)
    setLoadingData(false)
  }

  const handleAddData = async (emission: SessionEmissions & { emissionFactor: EmissionFactors }) => {
    setLoadingData(true)
    setSaving(true)

    const currentYear = new Date().getFullYear()

    let totalEmission = emission.value * emission.emissionFactor.value
    const depreciationPeriod = emission.emissionFactor.depreciationPeriod
      ? emission.emissionFactor.depreciationPeriod
      : 0
    if (depreciationPeriod > 0 && schoolYear) {
      totalEmission = currentYear - schoolYear < depreciationPeriod ? 0 : totalEmission / depreciationPeriod
    }

    const emissionData = {
      ...emission,
      idSessionEmissionSubCategory: sessionSubCategory.sessionEmissionSubCategories[0].id,
      total: totalEmission,
    }

    console.log('Creating session emission with data:', emissionData)

    const emissionResult = await createSessionEmission(emissionData)

    const updateSubCategory = sessionSubCategory.sessionEmissionSubCategories[0]

    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissionSubCategories: [
        {
          ...updateSubCategory,
          sessionEmissions: updateSubCategory.sessionEmissions.concat({ ...emission, ...emissionResult }),
        },
      ],
    })

    setSaving(false)
    setLoadingData(false)
  }

  return (
    <>
      <CustomDialog
        open={open}
        titleLabel="confirmTitle"
        contentLabel="confirmDuplicate"
        closeLabel="yes"
        confirmLabel="no"
        handleClose={handleClose}
      />
      <DataInput
        titleSelectInput={sessionSubCategory.dataToFill?.titleSelectInput}
        emissionFactors={sessionSubCategory.emissionFactors || []}
        saving={saving}
        locked={sessionSubCategory.locked}
        tootlipText={sessionSubCategory.dataToFill?.tooltipText}
        annualConsumptionText={sessionSubCategory.dataToFill?.titleAnnualConsumptionInput}
        handleAddData={handleAddData}
      />
      {loadingData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DataTable
            tableHeader={sessionSubCategory.dataToFill?.tableHeader}
            emissions={
              sessionSubCategory.sessionEmissionSubCategories[0]?.sessionEmissions.map((emission) => ({
                ...emission,
                emissionFactor: sessionSubCategory.emissionFactors.find((ef) => ef.id === emission.idEmissionFactor)!,
              })) || []
            }
            handleDelete={handleDelete}
          />
          <CommentInput addComment={addComment} />
          {sessionSubCategory.sessionEmissionSubCategories[0].comments?.map((comment, index) => (
            <Stack direction="row" spacing={2} key={index}>
              <Typography sx={{ paddingTop: 1 }}>{comment.comment}</Typography>
              <ConfirmationDialog
                title={t('confirmTitle')}
                description={t('confirmDeleteComment')}
                response={() => {
                  handleDeleteComment(comment)
                }}
              >
                {(showDialog: () => void) => (
                  <IconButton onClick={showDialog}>
                    <CancelPresentationOutlined sx={{ color: 'red' }} />
                  </IconButton>
                )}
              </ConfirmationDialog>
            </Stack>
          ))}
        </>
      )}
    </>
  )
}
