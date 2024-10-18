'use client'

import '../../../i18n';
import { Header } from "@/src/components/dashboard/header";
import Container from '@mui/material/Container';
import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import React, { FormEvent, useEffect, useState } from 'react';
import ConfirmationDialog from '../../../../components/ConfirmationDialog';
import { useTranslation } from "react-i18next";
import Establishment from '@/src/components/establishment/Establishment';
import { maxWidth, styled } from "@mui/system";
import { archiveStudentSession, createSession, getSessionsStudentsByGroup } from '@/api/sessions';
import { getUserCookies } from '@/api/auth';
import { useParams } from 'next/navigation'
import { Session } from '@/src/types/Session';
import { Params } from '@/src/types/Params';

const CustomContainer = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background-color: white;
`

const AccueilWrapper = styled(Box)`
    margin-top: 150px;
    a { color: #6d6d6d; }
    a:hover { color: black; }
`
export default function Sessions() {
    const theme = useTheme();

    const [currentSession, setCurrentSessions] = useState<Session[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const params = useParams<Params>()

    const deleteCurrentSession = (s: Session) => {
        archiveStudentSession(s)
        setCurrentSessions(currentSession => currentSession.filter((e: Session) => s.id != e.id));
    }

    const deleteSession = (session: Session) => {
        setSessions(prevSessions => prevSessions.filter((s: Session) => session.id != s.id));
    }

    const handleCreateSession = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);

        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        if (formData.get("sessionName")?.toString() === null) {
            return
        }
        const user = await getUserCookies()
        const session = await createSession(formData.get("sessionName")?.toString() || "", user, params.session)
        setCurrentSessions(currentSession.concat(session))
        setLoading(false);

    }

    const columnsCurrent = [
        { field: 'id', headerName: t('abc-id'), width: 90 },
        { field: 'name', headerName: t('abc-session-name'), flex: 1, },
        {
            field: 'action',
            headerName: t('abc-actions'),
            minWidth: 300,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (session: any) => {
                const onDelete = () => {
                    deleteCurrentSession(session.row);
                };

                return (
                    <Box>
                        <Button type='button' color='primary' href={'/dashboard/' + session.row.id}>Accès Session</Button>
                        <ConfirmationDialog
                            title={t('abc-confirm-title')}
                            description={t('abc-confirm-delete')}
                            response={onDelete}
                        >
                            {(showDialog: any) => (
                                <Button type='button' color='error' onClick={showDialog}>{t('abc-delete')}</Button>
                            )}
                        </ConfirmationDialog>
                    </Box>
                );
            },
        },
        {
            field: 'progress',
            headerName: t('abc-progression'),
            flex: 1,
            sortable: false,
            maxWidth: 100,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const value = params.row.progress
                return (
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={value} />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                            >{`${Math.round(value)}%`}</Typography>
                        </Box>
                    </Box>
                );
            },
        }

    ];

    const columns = [
        { field: 'id', headerName: t('abc-id'), width: 90 },
        { field: 'name', headerName: t('abc-session-name'), flex: 1, },
        {
            field: 'progress',
            headerName: t('abc-progression'),
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const value = params.row.progress
                return (
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={value} />
                        <Box>
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                            >{`${Math.round(value)}%`}</Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: 'action',
            headerName: t('abc-actions'),
            minWidth: 350,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const onDelete = (e: any) => {
                    deleteSession(params.row)
                };

                return (
                    <Box>
                        <Button type='button' color='primary' onClick={() => {
                        }}>{t('abc-enter')}</Button>
                        <ConfirmationDialog
                            title={t('abc-confirm-title')}
                            description={t('abc-confirm-delete')}
                            response={onDelete}
                        >
                            {(showDialog: any) => (
                                <Button type='button' color='error' onClick={showDialog}>{t('abc-delete')}</Button>
                            )}
                        </ConfirmationDialog>

                    </Box>
                );
            },
        }

    ];

    const localeText = {
        columnMenuSortAsc: t('abc-column-menu-sort-asc'),
        columnMenuSortDesc: t('abc-column-menu-sort-desc'),
        columnMenuFilter: t('abc-column-menu-filter'),
        columnMenuHideColumn: t('abc-column-menu-hide-column'),
        columnMenuShowColumns: t('abc-column-menu-show-columns'),
        columnMenuManageColumns: t('abc-column-menu-manage-columns'),
        columnMenuShowHideAll: t('abc-column-menu-show-hide-all'),
    };

    const fetchSessions = async () => {

        setLoading(true);
        const sessions = await getSessionsStudentsByGroup(params.session)
        setCurrentSessions(sessions.filter(g => !g.archived && !g.deleted));
        setSessions(sessions.filter(g => g.archived && !g.deleted));
        setLoading(false);
    }

    useEffect(() => {
        fetchSessions()
    }, []);

    return (
        <>
            <CustomContainer>
                <Header />
            </CustomContainer>

            <Container maxWidth="xl">
                <AccueilWrapper>
                    <Establishment />
                    <Box marginTop={8}>
                        <h2>{t('abc-my-current-session')}</h2>
                        <Box sx={{ height: 180, width: '100%', marginTop: 3 }}>
                            <DataGrid
                                rows={currentSession}
                                columns={columnsCurrent}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[1, 5]}
                                disableRowSelectionOnClick
                                localeText={localeText}
                            />
                        </Box>
                    </Box>
                    {loading ? <CircularProgress /> : (currentSession.length < 1 && <form onSubmit={handleCreateSession}>
                        <FormControl
                            sx={{
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1)
                            }}>
                            <div>
                                <OutlinedInput placeholder='Nom de la session'
                                    type="text"
                                    name="sessionName"
                                />
                                <Button type="submit"><AddIcon color='primary' />{t('abc-create-session')}</Button>
                            </div>
                        </FormControl>

                    </form>)}

                    <Box marginTop={8} height={400}>
                        <h2>{t('abc-previous-session')}</h2>
                        <Box sx={{ height: 375, width: '100%', marginTop: 3 }}>
                            <DataGrid
                                rows={sessions}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                disableRowSelectionOnClick
                                localeText={localeText}
                            />
                        </Box>
                    </Box>
                </AccueilWrapper>
            </Container>

        </>
    )
};
