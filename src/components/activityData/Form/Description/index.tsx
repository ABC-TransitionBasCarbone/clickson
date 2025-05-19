import { useTranslations } from 'next-intl'
import { StyledContainer, classes } from './styles'

interface ActivityDataFormDescription {
  description: string
}
export const ActivityDataFormDescription = ({ description }: ActivityDataFormDescription) => {
  const t = useTranslations('category')

  return (
    <StyledContainer>
      <p className={classes.paragraph}>{description}</p>
    </StyledContainer>
  )
}
