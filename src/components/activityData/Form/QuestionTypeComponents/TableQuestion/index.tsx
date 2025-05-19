'use client'

import { CancelPresentationOutlined } from '@mui/icons-material'
import { CircularProgress, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { createComment } from '../../../../../../api/comments'
import { createEmission, deleteComment, deleteEmission } from '../../../../../../api/emissions'
import ConfirmationDialog from '../../../../../components/ConfirmationDialog'
import { CustomDialog } from '../../../../../components/customDialog'
import { Comment } from '../../../../../types/Comment'
import { Emission } from '../../../../../types/Emission'
import { SessionSubCategory } from '../../../../../types/SessionSubCategory'
import { DataInput } from '../../DataInput'
import { DataTable } from '../../DataTable'
import { CommentInput } from '../CommentInput'

interface QuestionTypeComponentProps {
  sessionSubCategoryProp: SessionSubCategory
  schoolYear?: number | null
}

export const QuestionTypeComponent = ({ sessionSubCategoryProp, schoolYear }: QuestionTypeComponentProps) => {
  const [saving, setSaving] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [open, setOpen] = useState(false)
  const [sessionSubCategory, setSessionSubCategory] = useState(sessionSubCategoryProp)
  const t = useTranslations('category')

  const handleClose = () => {
    setOpen(false)
  }

  const addComment = async (comment: string) => {
    setLoadingData(true)
    const commentData = await createComment({ comment: comment, idEmissionSubCategory: sessionSubCategory.id })
    setSessionSubCategory({ ...sessionSubCategory, comments: sessionSubCategory.comments?.concat(commentData) })
    setLoadingData(false)
  }

  const handleDelete = async (emission: Emission) => {
    setLoadingData(true)
    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissions: sessionSubCategory.sessionEmissions.filter((se) => se.id !== emission.id),
    })
    await deleteEmission(emission)
    setLoadingData(false)
  }

  const handleDeleteComment = async (comment: Comment) => {
    setLoadingData(true)
    setSessionSubCategory({
      ...sessionSubCategory,
      comments: sessionSubCategory.comments?.filter((se) => se.id !== comment.id),
    })
    await deleteComment(comment)
    setLoadingData(false)
  }

  const handleAddData = async (emission: Emission) => {
    setLoadingData(true)
    setSaving(true)

    const currentYear = new Date().getFullYear()

    let totalEmission = emission.value * emission.emissionFactor.value
    if (emission.emissionFactor.depreciationPeriod && emission.emissionFactor.depreciationPeriod > 0 && schoolYear) {
      if (currentYear - schoolYear < emission.emissionFactor.depreciationPeriod) {
        totalEmission = 0
      } else {
        totalEmission = totalEmission / emission.emissionFactor.depreciationPeriod
      }
    }

    const emissionData = await createEmission({
      ...emission.emissionFactor,
      ...emission,
      total: totalEmission,
      idSessionEmissionSubCategory: sessionSubCategory.id,
      idEmissionFactor: emission.emissionFactor.id,
    })
    setSessionSubCategory({
      ...sessionSubCategory,
      sessionEmissions: sessionSubCategory.sessionEmissions.concat({ ...emission, ...emissionData }),
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
        emissionFactors={sessionSubCategory.emissionSubCategory.emissionFactors}
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
            emissions={sessionSubCategory.sessionEmissions}
            handleDelete={handleDelete}
          />
          <CommentInput addComment={addComment} />
          {sessionSubCategory.comments?.map((comment, index) => (
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
