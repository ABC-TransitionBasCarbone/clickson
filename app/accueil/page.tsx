'use client'


import '../i18n';
import {Header} from "@/app/components/dashboard/header";
import Container from '@mui/material/Container';
import {Box, Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import {Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {DataGrid} from '@mui/x-data-grid';

import { useEffect, useState } from 'react';
import { Session } from '../models/Session/Session';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useRouter } from 'next/navigation'
import {useTranslation} from "react-i18next";

const CustomContainer = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background-color: white;
`

const AccueilWrapper = styled(Box)`
    max-width: 100%;
    margin-top: 60px;
    min-height: calc(100vh - 290px);
    padding-top: 60px;
    padding-bottom: 80px;

    a {
        color: #6d6d6d;
    }

    a:hover {
        color: black;
    }
`

const Link = styled('a')`
    text-decoration: none;
`

export default function Accueil() {
    const theme = useTheme();

    const router = useRouter();

    const [currentSession, setCurrentSession] = useState<Session[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const {t} = useTranslation();
    const handleDeleteCurrentSession = (s: Session) => {
        setCurrentSession(currentSession.filter((e:Session) => s.id != e.id));
    }

    const handleDeleteSession = (s: Session) => {
        setSessions(sessions.filter((e:Session) => s.id != e.id));
    }

    const handleEdit = () => {
        router.push(`/dashboard`)
    }

    const columnsCurrent = [
        {field: 'id', headerName: t('abc-id'), width: 90},
        {field: 'name', headerName: t('abc-session-name'), flex: 1,},
        {
            field: 'progress',
            headerName: t('abc-progression'),
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const value = params.row.progress
                return (
                    <Box sx={{position: 'relative', display: 'inline-flex'}}>
                        <CircularProgress variant="determinate" value={value}/>
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
        },
        {
            field: 'action',
            headerName: t('abc-actions'),
            minWidth: 230,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const onDelete = (e: any) => {
                    handleDeleteCurrentSession(params.row);
                };

                return (
                    <Box>
                        <Button type='button' color='primary' onClick={handleEdit}>{t('abc-update')}</Button>
                        <ConfirmationDialog
                            title={t('abc-confirm-title')}
                            description={t('abc-confirm-delete')}
                            response={onDelete}
                            >
                            {(showDialog:any) => (
                                <Button type='button' color='error' onClick={showDialog} >{t('abc-delete')}</Button>
                            )}
                        </ConfirmationDialog>
                    </Box>
                );
            },
        }

    ];

    const columns = [
        {field: 'id', headerName: t('abc-id'), width: 90},
        {field: 'name', headerName: t('abc-session-name'), flex: 1,},
        {
            field: 'progress',
            headerName: t('abc-progression'),
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const value = params.row.progress
                return (
                    <Box sx={{position: 'relative', display: 'inline-flex'}}>
                        <CircularProgress variant="determinate" value={value}/>
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
        },
        {
            field: 'action',
            headerName: t('abc-actions'),
            minWidth: 230,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const onDelete = (e: any) => {
                    handleDeleteSession(params.row)
                };

                return (
                    <Box>
                        <Button type='button' color='primary' onClick={()=>{}}>{t('abc-enter')}</Button>
                        <ConfirmationDialog
                            title={t('abc-confirm-title')}
                            description={t('abc-confirm-delete')}
                            response={onDelete}
                            >
                            {(showDialog:any) => (
                                <Button type='button' color='error' onClick={showDialog} >{t('abc-delete')}</Button>
                            )}
                        </ConfirmationDialog>
                        
                    </Box>
                );
            },
        }

    ];

    const data1 = [
        {id: 1, name: 'Collecte 2023-2024_Collège VictorHugo', progress: 75.5},
    ];

    const data2 = [
        {id: 2, name: 'Collecte 2022-2023_Collège VictorHugo', progress: 70},
        {id: 3, name: 'Collecte 2021-2022_Collège VictorHugo', progress: 80},
        {id: 4, name: 'Collecte 2020-2021_Collège VictorHugo', progress: 88},
        {id: 5, name: 'Collecte 2029-2020_Collège VictorHugo', progress: 90},
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
    useEffect(()=> {
        setCurrentSession(data1.map((e) => new Session(e.id, e.name, e.progress)));
        setSessions(data2.map((e) => new Session(e.id, e.name, e.progress)));
    }, []);


    return (
        <>
            <CustomContainer>
                <Header/>
            </CustomContainer>

            <Container maxWidth="xl">
                <AccueilWrapper>
                    <h2>{t('abc-my-school')}</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>

                            <p>Collège Victor Hugo</p>
                            <p>1 rue Beauregard</p>
                            <p>75002 Paris</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>{t('abc-number-students')}: 1400</p>
                            <p>{t('abc-number-staff')}: 50</p>
                            <p>{t('abc-year-of-construction')}: 1950</p>
                        </Grid>
                    </Grid>
                    <Box marginTop={8}>
                        <h2>{t('abc-my-current-session')}</h2>
                        <Box>
                            <Link href='#'>
                                <AddIcon color='primary'/>{t('abc-create-session')}</Link>
                        </Box>
                        <Box sx={{height: 180, width: '100%', marginTop: 3}}>
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
                                pageSizeOptions={[1]}
                                disableRowSelectionOnClick
                                localeText={localeText}
                            />
                        </Box>
                    </Box>
                    <Box marginTop={8} height={400}>
                        <h2>{t('abc-previous-session')}</h2>
                        <Box sx={{height: 375, width: '100%', marginTop: 3}}>
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
