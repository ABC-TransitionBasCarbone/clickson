import {Grid, Box} from "@mui/material";

import eng from '../../public/eng.png';
import fra from '../../public/fra.png';
import esp from '../../public/esp.png';
import ita from '../../public/ita.png';

import Image from 'next/image'

export const Header = () => {
    return (
        <>
            <Box sx={{width: '100%'}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item sm={3}>
                        <Box sx={{border: 'none'}} className="logoHeader">
                            <img
                                src="https://calculator.clickson.eu/wp-content/themes/co2calc-child/images/logo.png"
                                alt="logo"
                            />
                        </Box>
                    </Grid>
                    <Grid item sm={6}>
                        <Box sx={{border: 'none'}}></Box>
                    </Grid>
                    <Grid item sm={3}>
                        <Box sx={{border: 'none'}} className="username">
                            <ul className="lang-menu">
                                <li><a href=""><Image src={eng} alt="eng" width={16} height={11}/></a></li>
                                <li><a href=""><Image src={fra} alt="eng" width={16} height={11}/></a></li>
                                <li><a href=""><Image src={esp} alt="eng" width={16} height={11}/></a></li>
                                <li><a href=""><Image src={ita} alt="eng" width={16} height={11}/></a></li>
                            </ul>
                            <p>teddy.courtaux@abc-transitionbascarbone.fr</p>
                            <a href="">Se déconnecter</a>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}