import {Box, Grid, useMediaQuery} from "@mui/material";
import waveBG from "@/public/waveBG.png";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";

export const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const CustomContainer = styled(Grid)(({theme}) => ({
        position: isSmallScreen ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030,
        backgroundColor: 'white'

    }));
    return (
        <Box component="footer" sx={{
            width: "100%",
            display: 'flex',
            visibility: isSmallScreen ? 'hidden' : 'visible',
            alignItems: "center",
            flexDirection: "column",
            mt: 'auto',
            position: isSmallScreen ? 'relative' : 'fixed',
            bottom: 0,
            mb: isSmallScreen ? 5 : 0,
        }}
        >

            <img src={waveBG.src} alt="logo" style={{
                maxWidth: '100%',
                height: 'auto',

            }}/>

        </Box>
    )

}