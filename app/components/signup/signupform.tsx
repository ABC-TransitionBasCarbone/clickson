import {
    Alert,
    FormControl,
    Grid, LinearProgress,
    TextField} from "@mui/material";
import theme from "@/app/theme";
import { Box, styled } from "@mui/system";
import { ChangeEvent, FormEventHandler, ReactElement } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete } from "@mui/material";

const BodyGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
}));


const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));


interface Country {
    country: {
        name_en: string;
        name_fr: string;
        flag: string;
    };
}

interface Props {
    showError?: boolean,
    showSuccess?: boolean,
    onSignUp: FormEventHandler,
    loading?: boolean,
    buttonValue?: string,
    handleChange?: ChangeEvent<HTMLInputElement>,
    countries: Country[],
    message: ReactElement | null,
    progress: number | undefined,
}

export const SignUpForm = ({ onSignUp, countries, showError, showSuccess, message, progress }: Props) =>
(
    <BodyGrid container spacing={5} columns={16}>
        <Grid item md={16}>
            {showError && (
                <FormControl sx={{
                    width: '100%',
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1)
                }}>
                    <Alert severity="error">
                        {message}
                    </Alert>
                </FormControl>
            )}
            {showSuccess && (
                <FormControl sx={{
                    width: '100%',
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1)
                }}>
                    <Alert severity="success">
                        {message}
                        <div style={{ paddingBottom: '4px' }}></div>
                        <LinearProgress variant="determinate" value={progress} sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4
                        }} />
                    </Alert>
                </FormControl>
            )}
            <form onSubmit={onSignUp}>
                <FormControl
                    sx={{
                        width: '100%',
                        marginTop: theme.spacing(3),
                        marginBottom: theme.spacing(1)
                    }}>
                    <TextField placeholder="Prénom"
                        name="first_name"
                        label="Prénom"
                    />
                </FormControl>
                <FormControl
                    sx={{
                        width: '100%',
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1)
                    }}>
                    <TextField placeholder="Nom de famille"
                        type="text"
                        name="last_name"
                        label="Nom de famille"
                    />
                </FormControl>
                <FormControl
                    sx={{
                        width: '100%',
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1)
                    }}>
                    <TextField placeholder="Adresse email"
                        type="email"
                        name="email"
                        label="Adresse email"

                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder="Mot de passe"
                                   type="password"
                                   name="password"
                                   label="Mot de passe"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <Autocomplete
                            id="country-select"
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.country.name_fr}
                            renderOption={(props, option) => {
                                const {key, ...optionProps} = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{'& > img': {mr: 2, flexShrink: 0}}}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={option.country.flag}
                                            src={option.country.flag}
                                            alt={option.country.name_fr}
                                        />
                                        {option.country.name_fr}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Pays"
                                    name="state"
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder="Ville"
                                   type="text"
                                   name="city"
                                   label="Ville"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder="Code Postal"
                                   type="text"
                                   name="zip_code"
                                   label="Code Postal"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder="Nom de mon établissement"
                                   type="text"
                                   name="school"
                                   label="Nom de mon établissement"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1),
                            '& .MuiLoadingButton-root.Mui-disabled': {
                                bgcolor: theme.palette.secondary.main,
                                color: 'white',
                            }
                        }}>
                        <StyledLoadingButton
                            size="large"
                            color="primary"
                            loading={false}
                            loadingPosition="start"
                            variant="contained"
                            type="submit"
                        >
                            <span>s'enregistrer</span>
                        </StyledLoadingButton>
                    </FormControl>


            </form>
        </Grid>
    </BodyGrid>
)
