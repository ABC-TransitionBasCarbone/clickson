import { Box, useMediaQuery } from "@mui/material";
import waveBG from "./../../../public/waveBG.png";
import { useTheme } from "@mui/material/styles";

export const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box component="footer"
                sx={{
                    width: "100%",
                    visibility: isSmallScreen ? 'hidden' : 'visible',
                    mt: 'auto',
                    bottom: 0,
                    mb: isSmallScreen ? 5 : 0,
                }}
            >
                <img src={waveBG.src} alt="logo" style={{
                    maxWidth: '100%',
                    height: 'auto',

                }} />

            </Box>
        </>

    )

}
