'use client'

import { Header } from "@/src/components/dashboard/header";
import Container from '@mui/material/Container';
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl'
import Establishment from '../../../components/establishment/Establishment';
import { styled } from "@mui/system";
import { getUserCookies } from '@/api/auth';
import { Session } from '@/src/types/Session';
import CollapsibleTable from '@/src/components/collapsabletable';
import { modifySession, createSession, getSessionsBySchoolId, lockedStudentSession } from '@/api/sessions';
import FormCreateSession from '@/src/components/collapsabletable/Form/FormCreateSession';
import { School } from '@/src/types/School';

const AccueilWrapper = styled(Box)`
    a { color: #6d6d6d; }
    a:hover { color: black; }
`

export default function SessionsBoard() {
    const t = useTranslations("session");

    const [sessions, setSessions] = useState<Session[]>([]);
    const [school, setSchool] = useState<School>({});
    const [loading, setLoading] = useState(false);

    async function modifySessionName(session: Session) {
        await modifySession(session)
    }

    async function archiveSession(session: Session) {
        session.archived = !session.archived
        session.locked = !session.archived
        const id = await modifySession(session)
        setSessions(sessions.filter(g => g.id !== id))
    }

    async function deleteSession(session: Session) {
        session.deleted = !session.deleted
        session.locked = !session.deleted
        const id = await modifySession(session)
        setSessions(sessions.filter(g => g.id !== id))
    }

    async function lockSession(session: Session) {
        await lockedStudentSession(session)
    }

    const handleCreateSession = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);

        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (formData.get("sessionName") === null) {
            return
        }
        const userSession = await getUserCookies()
        const createdSession = await createSession(formData.get("sessionName")?.toString() || "", userSession.school.id)
        setSessions(sessions.concat(createdSession))
        setLoading(false);
    }

    const fetchSessions = async () => {
        setLoading(true);
        const returnedUser = await getUserCookies()
        setSchool(returnedUser.school)
        const returnedSessions = await getSessionsBySchoolId(returnedUser.school.id || "")
        setSessions(returnedSessions)
        setLoading(false);
    }

    useEffect(() => {
        fetchSessions()
    }, []);

    return <>
        <Header />
        <Container maxWidth="xl">
            <AccueilWrapper>
                {school.id && <Establishment school={school} />}
                <Typography variant="h5" sx={{ marginTop: 2 }} >{t('list')}</Typography>
                {
                    loading ? <CircularProgress /> :
                        sessions.filter(s => !s.archived).length > 0 ?
                            <CollapsibleTable currentSession={sessions.filter(s => !s.archived)} archiveSession={archiveSession} lockSession={lockSession} modifySessionName={modifySessionName} /> :
                            <FormCreateSession handleCreateSession={handleCreateSession} />
                }

                <Typography variant="h5" sx={{ marginTop: 10 }} >{t('archivedList')}</Typography>
                {
                    loading ? <CircularProgress /> :
                        <CollapsibleTable currentSession={sessions.filter(s => s.archived)} deleteSession={deleteSession} lockSession={lockSession} />
                }
            </AccueilWrapper>
        </Container>
    </>
};
