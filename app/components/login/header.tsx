import {Grid, Box} from "@mui/material";

import {styled} from "@mui/system";
import LanguageSwitcher from "@/app/components/language-switcher/LanguageSwitcher";

const UsernameBox = styled('div')(({ theme }) => ({
    a: {
        color: theme.palette.primary.main,
    },
    textAlign: 'right',
    listStyle: 'none',
    marginRight: theme.spacing(1.25),
    p: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: theme.spacing(1),
    },
    'a:hover': {
        color: theme.palette.secondary.main
    }
}));

interface Props {
    logoPosition: string,
}

export const Header = ({logoPosition}: Props) => {
    const BoxHeader = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: logoPosition,
        alignItems: 'center',
        img: {
            maxHeight: '60px',
            padding: '5px',
        },
        margin: theme.spacing(2,1,2,1),
    }));
    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item sm={6}>
                    <BoxHeader>
                        <img
                            src="https://calculator.clickson.eu/wp-content/themes/co2calc-child/images/logo.png"
                            alt="logo"
                        />
                    </BoxHeader>
                </Grid>
                <Grid item sm={3}>
                    <UsernameBox sx={{border: 'none'}}>
                        <LanguageSwitcher />
                    </UsernameBox>
                </Grid>
            </Grid>
        </Box>
    )
}

