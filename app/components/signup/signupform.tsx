import {
    Alert, Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Link, MenuItem,
    OutlinedInput, Select, SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import theme from "@/app/theme";
import {styled} from "@mui/system";
import {ChangeEvent, FormEventHandler} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Image from "next/image";
import {Autocomplete} from "@mui/lab";

const BodyGrid = styled(Grid)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
}));

const StyledButton = styled(Button)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
}));

const StyledLoadingButton = styled(LoadingButton)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
}));

const CustomLink = styled(Link)(({theme}) => ({
    '&:hover': {
        color: theme.palette.secondary.main
    }
}))

interface Country {
    country: {
        name_en: string;
        name_fr: string;
        flag: string;
    };
}

interface Props {
    correctUserInfo?: boolean,
    onSignUp: FormEventHandler,
    loading?: boolean,
    buttonValue?: string,
    handleChange?: ChangeEvent<HTMLInputElement>,
    countries: Country[],
    message: string
}

export const SignUpForm = ({onSignUp, countries, correctUserInfo, message}: Props) =>
    (
        <BodyGrid container spacing={5} columns={16}>
            <Grid item md={16}>
                <form onSubmit={onSignUp}>
                    <FormControl
                        sx={{
                            width: '100%',
                            marginTop: theme.spacing(3),
                            marginBottom: theme.spacing(1)
                        }}>
                        <TextField placeholder="Prénom"
                                   name="firstname"
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
                                   name="lastname"
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
                        <TextField placeholder="L'école"
                                   type="text"
                                   name="ecole"
                                   label="L'école"
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

                    {!correctUserInfo && (
                        <FormControl sx={{
                            width: '100%',
                            marginTop: theme.spacing(1),
                            marginBottom: theme.spacing(1)
                        }}>
                            <Alert
                                severity="error"
                                variant="filled"
                            >
                                {message}
                            </Alert>
                        </FormControl>
                    )}
                </form>
            </Grid>
        </BodyGrid>
    )
