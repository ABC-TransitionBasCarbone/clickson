import { Divider } from '@mui/material'
import { StyledContainer, classes } from '../styles'

interface Props {
  category: string
}
export const ActivityDataFormHeader = ({ category }: Props) => {
  return (
    <StyledContainer>
      <h4> {category?.toUpperCase()}</h4>
      <Divider className={classes.divider} aria-hidden="true" />
    </StyledContainer>
  )
}
