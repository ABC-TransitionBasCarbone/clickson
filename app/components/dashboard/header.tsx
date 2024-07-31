import {Grid, Box} from "@mui/material";

import eng from '../../public/eng.png';
import fra from '../../public/fra.png';
import esp from '../../public/esp.png';
import ita from '../../public/ita.png';

import Image, {StaticImageData} from 'next/image'
import {styled} from "@mui/system";

const BoxHeader = styled(Box)`
    img {
        max-height: 50px;
        padding-left: 15px;
    }
`;

const UsernameBox = styled(Box)`
    text-align: right;
    list-style: none;
    margin: 0 10px 0 0;

    p {
        font-weight: bold;
        font-size: 12px;
        padding-bottom: 5px;
    }

    a {
        color: var(--abc-blue);
    }
    a:hover {
        color: var(--abc-orange);
    }
`;

const Link = styled('a')`
    text-decoration: none;
    
    
`
const LanguageMenu = styled('ul')`
    li {
        display: inline-block;
        padding-left: 10px;
        margin-top: 10px;
        margin-bottom: 14px;
    }
`;


export const Header = () => {

    const languages: StaticImageData[] = [eng, fra, ita, esp];
    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item sm={3}>
                    <BoxHeader>
                        <img
                            src="https://calculator.clickson.eu/wp-content/themes/co2calc-child/images/logo.png"
                            alt="logo"
                        />
                    </BoxHeader>
                </Grid>
                <Grid item sm={6}>
                    <Box sx={{border: 'none'}}></Box>
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
                        <p>teddy.courtaux@abc-transitionbascarbone.fr</p>
                        <Link href="">Se déconnecter</Link>
                    </UsernameBox>
                </Grid>
            </Grid>
        </Box>
    )
}
