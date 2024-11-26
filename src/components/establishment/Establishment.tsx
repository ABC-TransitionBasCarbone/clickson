import theme from "@/src/app/theme";
import { LoadingButton } from "@mui/lab";
import { Grid, Modal, Backdrop, Fade, Typography, Alert, FormControl, TextField, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState, FormEvent, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { editSchool } from "@/api/schools";
import { School } from "@/src/types/School";
import { getUserCookies } from "@/api/auth";
import { User } from "@/src/types/User";
import { useTranslations } from 'next-intl'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    borderRadius: '5px',
    p: 5,
};

const formControlStyle = {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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

export default function Establishment(props: EstablishmentProps) {
    const t = useTranslations('school');

    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [school, setSchool] = useState<School>(props.school);
    const [user, setUser] = useState<User>();


    const handleChange = (event: SelectChangeEvent) => {
        setSchool({ ...school, establishmentYear: Number(event.target.value) })
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
                <h2 >{t('school')}</h2>
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
                <p>{t('numberStudents')}: {school?.studentCount}</p>
                <p>{t('numberStaff')}: {school?.staffCount}</p>
                <p>{t('yearOfConstruction')}: {school?.establishmentYear}</p>
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
                        {t('updateSchool')}
                    </Typography>
                    {showSuccess ? <><Alert severity="success" sx={{ marginTop: theme.spacing(2) }}>
                        {t('schoolUpdateSuccessfully')}</Alert> </> : <span></span>
                    }
                    <form onSubmit={updateSchool}>
                        <FormControl sx={formControlStyle}>
                            <TextField placeholder={t('school')}
                                type="text"
                                name="name"
                                defaultValue={school?.name}
                                label={t('school')}
                            />
                        </FormControl>
                        <FormControl sx={formControlStyle}>
                            <TextField placeholder={t('schoolAddress')}
                                type="text"
                                name="adress"
                                defaultValue={school?.adress}
                                label={t('schoolAddress')}
                            />
                        </FormControl>
                        <FormControl sx={formControlStyle}>
                            <TextField placeholder={t('numberStudents')}
                                name="studentCount"
                                type="number"
                                defaultValue={school?.studentCount}
                                label={t('numberStudents')}
                            />
                        </FormControl>
                        <FormControl sx={formControlStyle}>
                            <TextField placeholder={t('numberStaff')}
                                type="number"
                                name="staffCount"
                                defaultValue={school?.staffCount}
                                label={t('numberStaff')}
                            />
                        </FormControl>
                        <FormControl sx={formControlStyle}>
                            <TextField placeholder={t('yearOfConstruction')}
                                type="number"
                                name="establishmentYear"
                                defaultValue={school?.establishmentYear}
                                label={t('yearOfConstruction')}
                            />
                        </FormControl>
                        <FormControl sx={formControlStyle}>
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
