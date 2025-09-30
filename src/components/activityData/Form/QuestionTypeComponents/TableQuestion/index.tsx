'use client'

import { createComment, deleteComment } from '@/services/serverFunctions/comment'
import { createSessionEmission, deleteSessionEmission } from '@/services/serverFunctions/session'
import { SessionSubCategory } from '@/types/SessionSubCategory'
import { CancelPresentationOutlined } from '@mui/icons-material'
import { CircularProgress, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { Comments, EmissionFactors, SessionEmissions } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ConfirmationDialog from '../../../../../components/ConfirmationDialog'
import { CustomDialog } from '../../../../../components/customDialog'
import { DataInput } from '../../DataInput'
import { DataTable } from '../../DataTable'
import { CommentInput } from '../CommentInput'

interface Props {
  subCategory: SessionSubCategory
  schoolYear?: number | null
}

export const QuestionTypeComponent = ({ subCategory, schoolYear }: Props) => {
  const [saving, setSaving] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [open, setOpen] = useState(false)
  const [sessionSubCategory, setSessionSubCategory] = useState(subCategory)
  const t = useTranslations('category')

  const handleClose = () => {
    setOpen(false)
  }

  const addComment = async (comment: string) => {
    setLoadingData(true)
    const commentData = await createComment(sessionSubCategory.id, comment)

    setSessionSubCategory({
      ...sessionSubCategory,
      comments: sessionSubCategory.comments?.concat(commentData) || [],
    })
    setLoadingData(false)
  }

  const handleDelete = async (emission: SessionEmissions) => {
    setLoadingData(true)

    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissions: sessionSubCategory.sessionEmissions.filter((se) => se.id !== emission.id),
    })

    await deleteSessionEmission(emission.id)
    setLoadingData(false)
  }

  const handleDeleteComment = async (comment: Comments) => {
    setLoadingData(true)

    setSessionSubCategory({
      ...sessionSubCategory,
      comments: sessionSubCategory.comments?.filter((se) => se.id !== comment.id),
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
      label: emission.label || emission.emissionFactor.label,
      type: emission.emissionFactor.type,
      unit: emission.emissionFactor.unit,
      idEmissionFactor: emission.emissionFactor.id,
      idSessionEmissionSubCategory: sessionSubCategory.id,
      total: totalEmission,
    }

    const emissionResult = await createSessionEmission(emissionData)

    const updatedSessionSubCategory = {
      ...sessionSubCategory,
      sessionEmissions: sessionSubCategory.sessionEmissions.concat({ ...emission, ...emissionResult }),
    }

    setSessionSubCategory(updatedSessionSubCategory)

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
        emissionFactors={sessionSubCategory.emissionSubCategory?.emissionFactors || []}
        saving={saving}
        locked={sessionSubCategory.locked || false}
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
            tableHeader={sessionSubCategory.dataToFill?.tableHeader || []}
            emissions={sessionSubCategory.sessionEmissions || []}
            handleDelete={handleDelete}
          />
          <CommentInput addComment={addComment} />
          {sessionSubCategory?.comments?.map((comment, index) => (
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
