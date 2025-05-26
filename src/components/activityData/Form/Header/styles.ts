import { styled } from '@mui/system'

const classesLabel = 'ActivityDataForm'

export const classes = {
  divider: `${classesLabel}Divider`,
}

export const StyledContainer = styled('div')(({ theme }) => ({
  [`.${classes.divider}`]: {
    marginTop: theme.spacing(5),
  },
}))
