'use client'

import { Header } from "@/src/components/dashboard/header";
import Container from '@mui/material/Container';
import { Box, CircularProgress } from "@mui/material";
import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl'
import Establishment from '../../../components/establishment/Establishment';
import { styled } from "@mui/system";
import { getUserCookies } from '@/api/auth';
import { Session } from '@/src/types/Session';
import CollapsibleTable from '@/src/components/collapsabletable';
import { archiveStudentSession, createSession, getSessionsBySchoolId, lockedStudentSession } from '@/api/sessions';
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

    async function deleteSession(session: Session) {
        const id = await archiveStudentSession(session)
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

    return (
        <>
            <div>
                <Header />
            </div>
            <Container maxWidth="xl">
                <AccueilWrapper>
                    {school.id && <Establishment school={school} />}
                    <h2>{t('list')}</h2>
                    {
                        loading ? <CircularProgress /> :
                            sessions.length > 0 ?
                                <CollapsibleTable currentSession={sessions} deleteSession={deleteSession} lockSession={lockSession} /> :
                                <FormCreateSession handleCreateSession={handleCreateSession} />
                    }
                </AccueilWrapper>
            </Container>
        </>
    )
};
