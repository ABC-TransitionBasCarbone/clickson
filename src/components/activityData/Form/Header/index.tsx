import { Divider } from '@mui/material'
import { useTranslations } from 'next-intl'
import { StyledContainer, classes } from '../styles'

interface Props {
  idSubCategory: number
}
export const ActivityDataFormHeader = ({ idSubCategory }: Props) => {
  const t = useTranslations('subCategories')

  return (
    <StyledContainer>
      <h4> {t(`${idSubCategory}.label`)}</h4>
      <Divider className={classes.divider} aria-hidden="true" />
    </StyledContainer>
  )
}
