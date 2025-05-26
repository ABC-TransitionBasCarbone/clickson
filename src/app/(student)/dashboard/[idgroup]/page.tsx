'use client'

import { getUserCookies } from '@/services/auth'
import { getEmissionCategories } from '@/services/serverFunctions/emission'
import { getGroup } from '@/services/serverFunctions/group'
import { NestedSessionStudents } from '@/types/NestedSessionStudents'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box, Button, Grid, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { styled } from '@mui/system'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CategoryItem } from '../../../../components/dashboard/Category'
import { Header } from '../../../../components/dashboard/header'
import { Stats } from '../../../../components/dashboard/stats'
import Establishment from '../../../../components/establishment/Establishment'
import { backgroundColors } from '../../../../constants/colors'
import { getLocale } from '../../../../i18n/locale'
import { routing } from '../../../../i18n/routing'
import { UrlParams } from '../../../../types/UrlParams'
import { User } from '../../../../types/User'

const DashboardWrapper = styled(Box)`
  max-width: 100%;
  min-height: calc(100vh - 290px);
  padding-bottom: 80px;
  a {
    color: #6d6d6d;
  }
  a:hover {
    color: black;
  }
`

const DividerSmall = styled('hr')`
  display: inline-block;
  background: #f79e0f;
  border: 0;
  width: 40px;
  height: 3px;
  border-radius: 5px;
`

export default function Dashboard() {
  const t = useTranslations('dashboard')
  const params = useParams<UrlParams>()
  const router = useRouter()

  const [loadingCategories, setLoadingCategories] = useState(false)
  const [session, setSession] = useState<NestedSessionStudents>({} as NestedSessionStudents)
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    getUser()
    fetchGroup()
  }, [])

  const getUser = async () => {
    const cookies = await getUserCookies()
    if (!cookies) {
      return
    }
    setUser(cookies)
  }

  const fetchGroup = async () => {
    setLoadingCategories(true)
    const group = await getGroup(params.idgroup)
    if (!group) {
      return
    }
    const locale = await getLocale()
    const idLang = routing.locales.findIndex((l) => l === locale) + 1

    const emissionCategories = await getEmissionCategories(idLang)
    const sessionCategories = group.sessionStudent.sessionEmissionCategories.map((sc, index) => ({
      ...emissionCategories[index],
      id: index,
      locked: sc.locked,
      idSessionEmissionCategory: sc.id,
    }))

    setSession(group.sessionStudent as NestedSessionStudents)
    setLoadingCategories(false)
  }

  return session.id ? (
    <>
      <Header />
      <Container maxWidth="xl">
        <DashboardWrapper>
          {user.email && (
            <Button
              onClick={() => {
                router.push('/sessions')
              }}
              sx={{ marginBottom: 2 }}
              variant="outlined"
              startIcon={<ArrowBackIosIcon />}
            >
              {t('home')}
            </Button>
          )}

          {session.school && <Establishment school={session.school} />}
          <Stats session={session} />

          {session.locked ? (
            t('locked')
          ) : (
            <Grid container marginBottom={6} sx={{ alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant="h4">{t('calculatorsMarkers')}</Typography>
              <DividerSmall />
              <Typography>
                {t('clickMarkerStart')} <strong>{t('dataGathering')}</strong>
              </Typography>
            </Grid>
          )}
          {session.locked || loadingCategories ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={1} columns={10}>
              {session.sessionEmissionCategories?.map((sessionEmissionCategory, i) => (
                <Grid key={i} size={2} sx={{ height: 700, display: 'flex' }}>
                  <CategoryItem
                    category={sessionEmissionCategory}
                    idGroup={params.idgroup}
                    user={user}
                    borderColor={backgroundColors[i]}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DashboardWrapper>
      </Container>
    </>
  ) : (
    <CircularProgress />
  )
}
