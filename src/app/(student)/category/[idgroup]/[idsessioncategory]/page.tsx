'use client'

import { Container } from '@mui/system'
import { ActivityDataForm } from '../../../../../../src/components/activityData/Form'
import { Header } from '../../../../../../src/components/dashboard/header'
import { useDataToFill } from '../../../../../constants/dataToFill'

export default function Category() {
  const dataToFill = useDataToFill()

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <ActivityDataForm dataToFill={dataToFill} />
      </Container>
    </>
  )
}
