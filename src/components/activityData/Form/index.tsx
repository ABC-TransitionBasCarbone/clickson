'use client'

import { getGroup } from '@/services/serverFunctions/group'
import { getSchoolService } from '@/services/serverFunctions/school'
import { getSessionCategoryWithId } from '@/services/serverFunctions/session'
import HomeIcon from '@mui/icons-material/Home'
import { Button, CircularProgress, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { Schools } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UrlParams } from '../../../types/UrlParams'
import { ActivityDataFormDescription } from './Description'
import { ActivityDataFormHeader } from './Header'
import { QuestionTypeComponent } from './QuestionTypeComponents/TableQuestion'
import { StyledContainer } from './styles'
import { SessionCategory, SessionSubCategory } from '@/types/SessionSubCategory'
import { DataToFill } from '@/types/DataToFill'
interface Props {
  dataToFill: DataToFill[]
}

export const ActivityDataForm = ({ dataToFill }: Props) => {
  const params = useParams<UrlParams>()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const [school, setSchool] = useState<Schools>()
  const t = useTranslations('category')
  const tCat = useTranslations('categories')

  const [sessionCategory, setSessionCategory] = useState<SessionCategory>({} as SessionCategory)

  const getCategoryData = async () => {
    setLoading(true)

    const sessionCategory = await getSessionCategoryWithId(params.idsessioncategory)

    if (!sessionCategory) {
      router.push('/dashboard/' + params.idgroup)
      return
    }

    console.log('sessionCategory', sessionCategory)

    setSessionCategory({
      ...sessionCategory,
      sessionEmissionSubCategories: sessionCategory.sessionEmissionSubCategories.map((ssc) => ({
        ...ssc,
        emissionSubCategory: {
          ...ssc.emissionSubCategory,
          locked: sessionCategory.locked,
          dataToFill: dataToFill.find((dtf) => dtf.id === ssc.idEmissionSubCategory) || null,
        },
      })),
    })

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
          {tCat(`${sessionCategory.idEmissionCategory}.label`)}
        </Typography>
      </Box>
      {sessionCategory &&
        sessionCategory.sessionEmissionSubCategories.map((ssc, i) => (
          <Stack key={i}>
            <ActivityDataFormHeader idSubCategory={ssc.idEmissionSubCategory} />
            <Stack spacing={2} marginTop={2} marginBottom={2} sx={{ flexDirection: 'row' }}>
              <ActivityDataFormDescription idSubCategory={ssc.idEmissionSubCategory} />
              <Stack sx={{ marginLeft: '24px !important', flex: 1 }}>
                <QuestionTypeComponent schoolYear={school?.establishmentYear} subCategory={ssc} />
              </Stack>
            </Stack>
          </Stack>
        ))}
    </StyledContainer>
  )
}
