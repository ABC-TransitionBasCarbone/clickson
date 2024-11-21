import theme from "@/src/app/theme";
import { LoadingButton } from "@mui/lab";
import { Grid, Modal, Backdrop, Fade, Typography, Alert, FormControl, TextField, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box, styled } from "@mui/system";
import { t } from "i18next";
import { useState, FormEvent, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { editSchool } from "@/api/schools";
import { School } from "@/src/types/School";
import { cookies } from "next/headers";
import { getUserCookies } from "@/api/auth";
import { User } from "@/src/types/User";

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

interface EstablishmentProps {
    school: School,
}

const options = [
    { key: 1, label: 'après 2004', value: 2004 },
    { key: 2, label: 'entre 1984 et 2004', value: 1990 },
    { key: 3, label: 'avant 1984', value: 1984 },
]

export default function Establishment(props: EstablishmentProps) {

    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [school, setSchool] = useState<School>(props.school);
    const [user, setUser] = useState<User>();


    const handleChange = (event: SelectChangeEvent) => {
        console.log("🚀 ~ handleChange ~ event:", event)
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => (setOpen(false), setShowSuccess(false))

    const updateSchool = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const schoolReturn = await editSchool(formData, school)
        setSchool(schoolReturn)
        setShowSuccess(true)
    }
    const getUser = async () => {
        const user = await getUserCookies()
        setUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    return <>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <h2 >{t('my-school')}</h2>
                {user?.token && <Button variant="contained" onClick={handleOpen} sx={{ marginLeft: 1 }}>  <EditIcon /></Button>}

            </Grid>
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>

                <p>{school?.name}</p>
                <p>{school?.adress}</p>
                <p>{school?.postalCode} {school?.townName}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <p>{t('number-students')}: {school?.studentCount}</p>
                <p>{t('number-staff')}: {school?.staffCount}</p>
                <p>{t('year-of-construction')}: {school?.establishmentYear}</p>
            </Grid>
        </Grid>
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
                        {t('update-school')}
                    </Typography>
                    {showSuccess ? <><Alert severity="success" sx={{ marginTop: theme.spacing(2) }}>
                        {t('school-update-successfully')}</Alert> </> : <span></span>
                    }
                    <form onSubmit={updateSchool}>
                        <FormControl
                            sx={{
                                width: '100%',
                                marginTop: theme.spacing(3),
                                marginBottom: theme.spacing(1)
                            }}>
                            <TextField placeholder={t('my-school')}
                                type="text"
                                name="name"
                                defaultValue={school?.name}
                                label={t('my-school')}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: '100%',
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1)
                            }}>
                            <TextField placeholder={t('school-address')}
                                type="text"
                                name="adress"
                                defaultValue={school?.adress}
                                label={t('school-address')}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: '100%',
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1)
                            }}>
                            <TextField placeholder={t('number-students')}
                                name="studentCount"
                                type="number"
                                defaultValue={school?.studentCount}
                                label={t('number-students')}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: '100%',
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1)
                            }}>
                            <TextField placeholder={t('number-staff')}
                                type="number"
                                name="staffCount"
                                defaultValue={school?.staffCount}
                                label={t('number-staff')}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: '100%',
                                marginTop: theme.spacing(1),
                                marginBottom: theme.spacing(1)
                            }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={school?.establishmentYear?.toString()}
                                label={t('number-staff')}
                                onChange={handleChange}
                            >
                                {
                                    options.map((option) => (
                                        <MenuItem value={option.value} >{option.label}</MenuItem>
                                    ))
                                }
                            </Select>
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
                                <span>{t('update')}</span>
                            </StyledLoadingButton>
                        </FormControl>
                    </form>
                </Box>
            </Fade>
        </Modal></>

};
