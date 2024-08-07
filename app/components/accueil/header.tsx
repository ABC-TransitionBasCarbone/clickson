import {Grid, Box} from "@mui/material";

import eng from '../../public/eng.png';
import fra from '../../public/fra.png';
import esp from '../../public/esp.png';
import ita from '../../public/ita.png';

import Image, {StaticImageData} from 'next/image'
import {styled} from "@mui/system";
import Container from '@mui/material/Container';

const BoxHeader = styled(Box)`
    img {
        max-height: 50px;
        padding-left: 15px;
    }
`;

const Link = styled('a')`
    text-decoration: none;
`;

const LanguageMenu = styled('ul')`
    li {
        display: inline-block;
        padding-left: 10px;
        margin-top: 10px;
        margin-bottom: 14px;
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

export const Header = () => {
    const languages: StaticImageData[] = [eng, fra, esp, ita];
    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item sm={8}>
                    
                </Grid>
                <Grid item sm={4}>
                    <UsernameBox sx={{border: 'none'}}>
                        <LanguageMenu>
                            {languages.map((language, id) => (
                                <li key={id}>
                                    <Link href=""><Image src={language} alt="languages" width={16} height={11}/></Link>
                                </li>
                            ))}
                        </LanguageMenu>
                        <p>admin_calculator</p>
                        <Link href="">Se déconnecter</Link>
                    </UsernameBox>
                </Grid>
            </Grid>
        </Box>
    )
}
