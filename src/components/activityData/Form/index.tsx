'use client'

import { getGroup } from '@/services/serverFunctions/group'
import { getSchoolService } from '@/services/serverFunctions/school'
import { getSessionCategoryWithId } from '@/services/serverFunctions/session'
import { SessionSubCategory } from '@/types/SessionSubCategory'
import HomeIcon from '@mui/icons-material/Home'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { Schools } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getLocale } from '../../../i18n/locale'
import { routing } from '../../../i18n/routing'
import { DataToFill } from '../../../types/DataToFill'
import { UrlParams } from '../../../types/UrlParams'
import { ActivityDataFormDescription } from './Description'
import { ActivityDataFormHeader } from './Header'
import { QuestionTypeComponent } from './QuestionTypeComponents/TableQuestion'
import { StyledContainer } from './styles'

interface Props {
  dataToFill: DataToFill[]
}

export const ActivityDataForm = ({ dataToFill }: Props) => {
  const params = useParams<UrlParams>()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const [school, setSchool] = useState<Schools>()
  const [labelCategory, setLabelCategory] = useState('')
  const t = useTranslations('category')

  const [sessionSubCategory, setSessionSubCategory] = useState<SessionSubCategory>({} as SessionSubCategory)

  const getCategoryData = async () => {
    setLoading(true)
    const locale = await getLocale()
    const idLang = routing.locales.findIndex((l) => l === locale) + 1

    const sessionCategory = await getSessionCategoryWithId(params.idsessioncategory, idLang)

    if (!sessionCategory) {
      router.push('/dashboard/' + params.idgroup)
      return
    }

    setLabelCategory(sessionCategory?.emissionCategory.label || '')

    const sessionEmissionCategories = {
      ...sessionCategory,
      idSessionEmissionCategory: sessionCategory.id,
      idEmissionSubCategory: sessionCategory.emissionCategory.id,
      emissionCategory: {
        ...sessionCategory?.emissionCategory,
        emissionSubCategories: sessionCategory?.emissionCategory.emissionSubCategories.map((esc) => ({
          ...esc,
          dataToFill: dataToFill.find((dtf) => dtf.id === esc.id),
          emissionFactors: esc.emissionFactors ?? [],
          locked: sessionCategory.locked,
        })),
      },
    }

    setSessionSubCategory(sessionEmissionCategories)

    getSchool()
    setLoading(false)
  }

  const getSchool = async () => {
    const group = await getGroup(params.idgroup)
    if (group?.idSchool) {
      const schoolData = await getSchoolService(group.idSchool)
      if (schoolData) {
        setSchool(schoolData)
      }
    }
  }

  useEffect(() => {
    getCategoryData()
  }, [])

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>
  ) : (
    <StyledContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Button onClick={() => router.push('/dashboard/' + params.idgroup)} variant="outlined" startIcon={<HomeIcon />}>
          {t('home')}
        </Button>
        <Typography variant="h4" sx={{ marginLeft: 2 }}>
          {labelCategory}
        </Typography>
      </Box>
      {sessionSubCategory &&
        sessionSubCategory.emissionCategory.emissionSubCategories.map((ssc, i) => (
          <Stack key={i}>
            <ActivityDataFormHeader category={ssc.label || ''} />
            <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: 'row' }}>
              <ActivityDataFormDescription description={ssc.detail || ''} />
              <Stack sx={{ marginLeft: '24px !important', flex: 1 }}>
                <QuestionTypeComponent schoolYear={school?.establishmentYear} emissionSubCategory={ssc} />
              </Stack>
            </Stack>
          </Stack>
        ))}
    </StyledContainer>
  )
}
