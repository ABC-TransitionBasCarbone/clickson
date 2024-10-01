import { getUserCookies } from "@/api/auth";
import theme from "@/app/theme";
import { School } from "@/app/types/School";
import { LoadingButton } from "@mui/lab";
import { Grid, CircularProgress, Modal, Backdrop, Fade, Typography, Alert, FormControl, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { t } from "i18next";
import { useState, FormEvent, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { editSchool, getSchool } from "@/api/schools";

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

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));

export default function Establishment() {
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setShowSuccess(false);
    }

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [school, setSchool] = useState<School | null>();

    const updateSchool = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const schoolReturn = await editSchool(formData, school)
        setSchool(schoolReturn)
        setShowSuccess(true)
    }

    const fetchSchool = async () => {
        setLoading(true);
        const userSession = await getUserCookies()
        setSchool(userSession.school);
        setLoading(false);
    }

    useEffect(() => {
        fetchSchool()
    }, []);

    return (<>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <h2>{t('abc-my-school')}</h2>
            </Grid>
            <Grid item xs={12} sm={9} sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={handleOpen}>
                {school && <EditIcon />}
            </Grid>
        </Grid>
        {
            loading ? <CircularProgress /> : <>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>

                        <p>{school?.name}</p>
                        <p>{school?.adress}</p>
                        <p>{school?.postal_code} {school?.town_name}</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <p>{t('abc-number-students')}: {school?.student_count}</p>
                        <p>{t('abc-number-staff')}: {school?.staff_count}</p>
                        <p>{t('abc-year-of-construction')}: {school?.establishment_year}</p>
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
            slots={{ backdrop: Backdrop }}
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
                    {showSuccess ? <><Alert severity="success" sx={{ marginTop: theme.spacing(2) }}>
                        {t('abc-school-update-successfully')}</Alert> </> : <span></span>
                    }
                    {showError ? <Alert severity="error" sx={{ marginTop: theme.spacing(2) }}>
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
                                name="name"
                                defaultValue={school?.name}
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
                                name="adress"
                                defaultValue={school?.adress}
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
                                name="student_count"
                                type="number"
                                defaultValue={school?.student_count}
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
                                name="staff_count"
                                defaultValue={school?.staff_count}
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
                                name="establishment_year"
                                defaultValue={school?.establishment_year}
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
        </Modal></>
    )
};
