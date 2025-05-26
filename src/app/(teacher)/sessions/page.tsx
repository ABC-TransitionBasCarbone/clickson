'use client'

import CollapsibleTable from '@/components/collapsabletable'
import { getUserCookies } from '@/services/auth'
import { createSession, getSessions, lockedStudentSession, modifySession } from '@/services/serverFunctions/session'
import { Box, CircularProgress, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { styled } from '@mui/system'
import { Schools, SessionStudents } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { FormEvent, useEffect, useState } from 'react'
import FormCreateSession from '../../../components/collapsabletable/Form/FormCreateSession'
import { Header } from '../../../components/dashboard/header'
import Establishment from '../../../components/establishment/Establishment'

const AccueilWrapper = styled(Box)`
  a {
    color: #6d6d6d;
  }
  a:hover {
    color: black;
  }
`

export default function SessionsBoard() {
  const t = useTranslations('session')

  const [sessions, setSessions] = useState<SessionStudents[]>([])
  const [school, setSchool] = useState<Schools>()
  const [loading, setLoading] = useState(false)

  async function modifySessionName(session: SessionStudents) {
    await modifySession(session)
  }

  async function archiveSession(session: SessionStudents) {
    session.archived = !session.archived
    session.locked = true
    const id = await modifySession(session)
    setSessions(sessions.map((s) => (s.id == id ? session : s)))
  }

  async function deleteSession(session: SessionStudents) {
    session.deleted = !session.deleted
    session.locked = true
    const id = await modifySession(session)
    setSessions(sessions.map((s) => (s.id == id ? session : s)))
  }

  async function lockSession(session: SessionStudents) {
    await lockedStudentSession(session)
  }

  const handleCreateSession = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)

    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (formData.get('sessionName') === null) {
      return
    }
    const userSession = await getUserCookies()
    const createdSession = await createSession(userSession.school.id, formData.get('sessionName')?.toString())
    setSessions(sessions.concat(createdSession))
    setLoading(false)
  }

  const fetchSessions = async () => {
    setLoading(true)
    const returnedUser = await getUserCookies()
    setSchool(returnedUser.school)

    const returnedSessions = await getSessions(returnedUser.school.id)

    if (!returnedSessions) {
      setLoading(false)
      return
    }
    setSessions(returnedSessions)
    setLoading(false)
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <AccueilWrapper>
          {school && <Establishment school={school} />}
          <Typography variant="h5" sx={{ marginTop: 5 }}>
            {t('list')}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : sessions.filter((s) => !s.deleted && !s.archived).length > 0 ? (
            <CollapsibleTable
              currentSession={sessions.filter((s) => !s.deleted && !s.archived)}
              deleteSession={deleteSession}
              archiveSession={archiveSession}
              lockSession={lockSession}
              modifySessionName={modifySessionName}
            />
          ) : (
            <FormCreateSession handleCreateSession={handleCreateSession} />
          )}
          <Typography variant="h5" sx={{ marginTop: 10 }}>
            {t('archivedList')}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <CollapsibleTable
              currentSession={sessions.filter((s) => !s.deleted && s.archived)}
              deleteSession={deleteSession}
              archiveSession={archiveSession}
              lockSession={lockSession}
            />
          )}
        </AccueilWrapper>
      </Container>
    </>
  )
}
