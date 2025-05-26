'use client'

import theme from '@/app/theme'
import { lockedSessionCategory } from '@/services/serverFunctions/session'
import { NestedSessionEmissionCategory } from '@/types/NestedSessionEmissionCategory'
import { User } from '@/types/User'
import { Lock, NoEncryption } from '@mui/icons-material'
import { Grid, Switch, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'

const OngoingButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'white !important',
  fontSize: 16,
  textTransform: 'capitalize',
  minWidth: 120,
  height: 50,
  borderRadius: 8,
  textAlign: 'center',
  border: '0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}))

interface Props {
  category: NestedSessionEmissionCategory
  borderColor: string
  user: User
  idGroup: string
}

export const CategoryItem = (props: Props) => {
  const t = useTranslations('dashboard')
  const [locked, setLocked] = useState(props.category.locked ?? false)

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocked(event.target.checked)
    lockedSessionCategory(props.category.id, event.target.checked)
  }

  const conatinerStyle = {
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
    borderRadius: 3,
    border: `2px solid ${props.borderColor}`,
    display: 'flex',
  }

  return (
    <Grid container size={8} sx={conatinerStyle}>
      <Typography color={theme.palette.primary.main} variant="h5" align={'center'}>
        {props.category.emissionCategory.label}
      </Typography>
      <Typography marginTop={2} marginBottom={2}>
        {props.category.emissionCategory.detail}
      </Typography>
      <Grid display="flex" alignItems="center" gap={1} alignSelf="flex-end">
        <Link href={`/category/` + props.idGroup + '/' + props.category.id}>
          <OngoingButton>{t('onGoing')}</OngoingButton>
        </Link>
        {props.user.email && (
          <Switch
            checkedIcon={<Lock />}
            icon={<NoEncryption sx={{ color: 'green' }} />}
            checked={locked}
            color="error"
            onChange={handleValueChange}
            sx={{
              '& .MuiSwitch-track': {
                backgroundColor: 'green',
              },
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}
