'use client'


import '../i18n';
import {Header} from "@/app/components/dashboard/header";
import Container from '@mui/material/Container';
import {Alert, Backdrop, Box, Button, Fade, FormControl, Modal, Snackbar, TextField} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import {Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {DataGrid} from '@mui/x-data-grid';

import React, {FormEvent, useEffect, useState} from 'react';
import {Session} from '../models/Session/Session';
import ConfirmationDialog from '../components/ConfirmationDialog';
import {useRouter} from 'next/navigation'
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from "@mui/lab/LoadingButton";
import {editSchool, getAuthenticatedUserData, getSession} from "@/lib";
import {User} from "@/app/types/User";
import {UserAdditionalInfos} from "@/app/types/UserAdditionalInfos";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    borderRadius: '5px',
    p: 4,
};

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
const StyledLoadingButton = styled(LoadingButton)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));


export default function Accueil() {
    const theme = useTheme();
    const router = useRouter();

    const [currentSession, setCurrentSession] = useState<Session[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const handleDeleteCurrentSession = (s: Session) => {
        setCurrentSession(currentSession.filter((e: Session) => s.id != e.id));
    }

    const handleDeleteSession = (s: Session) => {
        setSessions(sessions.filter((e: Session) => s.id != e.id));
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
                            {(showDialog: any) => (
                                <Button type='button' color='error' onClick={showDialog}>{t('abc-delete')}</Button>
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

    const [userData, setUserData] = useState<UserAdditionalInfos | null>({
        city: "",
        construction_year: "",
        number_of_staff: "",
        number_of_student: "",
        school: "",
        school_address: "",
        state: "",
        zip_code: ""
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const fetchUserData = async () => {
        setLoading(true);
        let userEmail: string | undefined = "";
        await getSession().then(user => {
            userEmail = user?.user_email
        });

        await getAuthenticatedUserData(userEmail).then(data => {

            setUserData({
                city: data.users[0].acf.city,
                construction_year: data.users[0].acf.construction_year,
                number_of_staff: data.users[0].acf.number_of_staff,
                number_of_student: data.users[0].acf.number_of_students,
                school: data.users[0].acf.school,
                school_address: data.users[0].acf.school_address,
                state: data.users[0].acf.state,
                zip_code: data.users[0].acf.zip_code
            })
            setLoading(false);
        });

    }
    const updateSchool = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        editSchool(formData, user?.user_email).then((response) => {
            if (response) {
                setShowSuccess(true);
                const timer = setTimeout(() => {
                    handleClose()
                    fetchUserData()
                }, 3000)
                return () => clearTimeout(timer)
            } else {
                setShowError(true);
            }
        })

    }
    const [user, setUser] = useState<User>({
        city: "",
        role: "",
        school: "",
        state: "",
        user_display_name: "",
        user_email: "",
        zip_code: ""
    });
    const fetchCookies = async () => {
        const cookies = await getSession();
        if (!cookies) {
            return
        }
        setUser(cookies);
    }
    useEffect(() => {
        fetchCookies();
        setCurrentSession(data1.map((e) => new Session(e.id, e.name, e.progress)));
        setSessions(data2.map((e) => new Session(e.id, e.name, e.progress)));
        fetchUserData()
    }, [setUserData]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setShowSuccess(false);
    }

    return (
        <>
            <CustomContainer>
                <Header/>
            </CustomContainer>

            <Container maxWidth="xl">
                <AccueilWrapper>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3} sx={{display: 'flex', alignItems: 'center'}}>
                            <h2>{t('abc-my-school')}</h2>
                        </Grid>
                        <Grid item xs={12} sm={9} sx={{display: 'flex', alignItems: 'center'}}>
                            <Link sx={{cursor: "pointer"}} onClick={handleOpen}>
                                {user?.role == "teacher" ? <EditIcon/> : <span></span>}
                            </Link>
                        </Grid>
                    </Grid>
                    {loading ? <CircularProgress/> : <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>

                                <p>{userData?.school}</p>
                                <p>{userData?.school_address}</p>
                                <p>{userData?.zip_code} {userData?.city}</p>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <p>{t('abc-number-students')}: {userData?.number_of_student}</p>
                                <p>{t('abc-number-staff')}: {userData?.number_of_staff}</p>
                                <p>{t('abc-year-of-construction')}: {userData?.construction_year}</p>
                            </Grid>
                        </Grid>
                    </>
                    }
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{backdrop: Backdrop}}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    {t('abc-update-school')}
                                </Typography>
                                {showSuccess ? <><Alert severity="success" sx={{marginTop: theme.spacing(2)}}>
                                    {t('abc-school-update-successfully')}</Alert> </> : <span></span>
                                }
                                {showError ? <Alert severity="error" sx={{marginTop: theme.spacing(2)}}>
                                    {t('abc-school-update-error')}</Alert> : <span></span>
                                }
                                <form onSubmit={updateSchool}>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(3),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <TextField placeholder={t('abc-my-school')}
                                                   type="text"
                                                   name="school"
                                                   defaultValue={userData?.school}
                                                   label={t('abc-my-school')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(1),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <TextField placeholder={t('abc-school-address')}
                                                   type="text"
                                                   name="school_address"
                                                   defaultValue={userData?.school_address}
                                                   label={t('abc-school-address')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(1),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <TextField placeholder={t('abc-number-students')}
                                                   name="number_of_students"
                                                   type="number"
                                                   defaultValue={userData?.number_of_student}
                                                   label={t('abc-number-students')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(1),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <TextField placeholder={t('abc-number-staff')}
                                                   type="number"
                                                   name="number_of_staff"
                                                   defaultValue={userData?.number_of_staff}
                                                   label={t('abc-number-staff')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(1),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <TextField placeholder={t('abc-year-of-construction')}
                                                   type="number"
                                                   name="construction_year"
                                                   defaultValue={userData?.construction_year}
                                                   label={t('abc-year-of-construction')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            marginTop: theme.spacing(1),
                                            marginBottom: theme.spacing(1)
                                        }}>
                                        <StyledLoadingButton
                                            size="large"
                                            color="primary"
                                            loading={false}
                                            loadingPosition="start"
                                            variant="contained"
                                            type="submit"
                                        >
                                            <span>{t('abc-update')}</span>
                                        </StyledLoadingButton>
                                    </FormControl>
                                </form>
                            </Box>
                        </Fade>
                    </Modal>


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
