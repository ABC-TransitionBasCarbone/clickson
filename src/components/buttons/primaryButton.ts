import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  minWidth: '100%',
  minHeight: 57,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}))
