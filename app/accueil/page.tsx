'use client'


import '../i18n';
import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Box, Button} from "@mui/material";
import Divider from '@mui/material/Divider';
import {useTheme} from "@mui/material/styles";
import {minWidth, styled} from "@mui/system";
import {Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import ExcelJS from 'exceljs';
import { useEffect, useState } from 'react';
import { Session } from '../models/Session/Session';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useRouter } from 'next/navigation'

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

const CustomH6 = styled('h6')`
    font-size: 1rem;
    line-height: 1.2;
`

const classes = {
    root: {
        flexGrow: 1
    },
    paper: {
        padding: 20,
        textAlign: "center",
        color: "blue",
        fontFamily: "Roboto"
    }
};

export default function Accueil() {
    const theme = useTheme();

    const router = useRouter();

    const [currentSession, setCurrentSession] = useState<Session[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);

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
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: "Nom de session", flex: 1,},
        {
            field: 'progress',
            headerName: "Progression",
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
            headerName: "ACTIONS",
            minWidth: 230,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const onDelete = (e: any) => {
                    handleDeleteCurrentSession(params.row);
                };

                return (
                    <Box>
                        <Button type='button' color='primary' onClick={handleEdit}>Modifier</Button>
                        <ConfirmationDialog
                            title="Confirmation"
                            description="Souhaitez-vous supprimer définitivement cette donnée ?"
                            response={onDelete}
                            >
                            {(showDialog:any) => (
                                <Button type='button' color='error' onClick={showDialog} >Supprimer</Button>
                            )}
                        </ConfirmationDialog>
                    </Box>
                );
            },
        }

    ];

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: "Nom de session", flex: 1,},
        {
            field: 'progress',
            headerName: "Progression",
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
            headerName: "ACTIONS",
            minWidth: 230,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params: any) => {
                const onDelete = (e: any) => {
                    handleDeleteSession(params.row)
                };

                return (
                    <Box>
                        <Button type='button' color='primary' onClick={()=>{}}>Consulter</Button>
                        <ConfirmationDialog
                            title="Confirmation"
                            description="Souhaitez-vous supprimer définitivement cette donnée ?"
                            response={onDelete}
                            >
                            {(showDialog:any) => (
                                <Button type='button' color='error' onClick={showDialog} >Supprimer</Button>
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
                    <h2>Mon établissement</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>

                            <p>Collège Victor Hugo</p>
                            <p>1 rue Beauregard</p>
                            <p>75002 Paris</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Nombre élèves: 1400</p>
                            <p>Nombre personnels: 50</p>
                            <p>Année de construction: 1950</p>
                        </Grid>
                    </Grid>
                    <Box marginTop={8}>
                        <h2>Ma session en cours</h2>
                        <Box>
                            <Link href='#'><AddIcon color='primary'/> Créer une session</Link>
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
                            />
                        </Box>
                    </Box>
                    <Box marginTop={8} height={400}>
                        <h2>Mes sessions précédentes</h2>
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
                            />
                        </Box>
                    </Box>


                </AccueilWrapper>
            </Container>

        </>
    )
};
