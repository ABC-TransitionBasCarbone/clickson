import { Box, Grid } from '@mui/material'

import { styled } from '@mui/system'
import LanguageSwitcher from '../language-switcher/LanguageSwitcher'

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
    color: theme.palette.secondary.main,
  },
}))

const CustomContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  background-color: white;
`

const BoxHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  img: {
    maxHeight: '60px',
    padding: '5px',
  },
}))

export const Header = () => {
  return (
    <CustomContainer>
      <Box sx={{ width: '100%' }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid size={6}>
            <BoxHeader >
              <img src="https://clickson.eu/wp-content/uploads/2021/06/logo-color.png" alt="logo" />
            </BoxHeader>
          </Grid>
          <Grid size={3}>
            <UsernameBox sx={{ border: 'none' }}>
              <LanguageSwitcher />
            </UsernameBox>
          </Grid>
        </Grid>
      </Box>
    </CustomContainer>
  )
}
