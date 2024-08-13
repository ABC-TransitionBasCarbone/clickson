import {Grid, Box, Link} from "@mui/material";

import eng from '../../public/eng.png';
import fra from '../../public/fra.png';
import esp from '../../public/esp.png';
import ita from '../../public/ita.png';

import Image, {StaticImageData} from 'next/image'
import {styled} from "@mui/system";


const LanguageMenu = styled('ul')`
    li {
        display: inline-flex;
        align-items: center;
        padding-left: 10px;
        margin-bottom: 16px;
    }
`;

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
    const languages: StaticImageData[] = [eng, fra, ita, esp];
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
                        <LanguageMenu>
                            {languages.map((language, id) => (
                                <li key={id}>
                                    <Link href=""><Image src={language} alt="languages" width={16} height={11}/></Link>
                                </li>
                            ))}
                        </LanguageMenu>
                    </UsernameBox>
                </Grid>
            </Grid>
        </Box>
    )
}

