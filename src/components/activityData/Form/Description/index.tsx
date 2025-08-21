import { useTranslations } from 'next-intl'
import { StyledContainer, classes } from './styles'

interface ActivityDataFormDescription {
  idSubCategory: number
}
export const ActivityDataFormDescription = ({ idSubCategory }: ActivityDataFormDescription) => {
  const t = useTranslations('subCategories')

  return (
    <StyledContainer>
      <p className={classes.paragraph}>{t(`${idSubCategory}.detail`)}</p>
    </StyledContainer>
  )
}
