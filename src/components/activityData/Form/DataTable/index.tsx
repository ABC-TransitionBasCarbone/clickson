'use client'

import ConfirmationDialog from '@/components/ConfirmationDialog'
import { toLocaleString } from '@/helpers/helpers'
import { CancelPresentationOutlined } from '@mui/icons-material'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { EmissionFactors, SessionEmissions } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface DataTableProps {
  emissions: (SessionEmissions & { emissionFactor: EmissionFactors })[]
  tableHeader?: string[]
  handleDelete: (row: SessionEmissions & { emissionFactor: EmissionFactors }) => void
}

export const DataTable = ({ tableHeader, emissions, handleDelete }: DataTableProps) => {
  const t = useTranslations('category')
  const [totalValues, setTotalValues] = useState(0)

  useEffect(() => {
    setTotalValues(emissions.reduce((acc, emission) => acc + Number(emission.total), 0))
  }, [emissions])

  return (
    <TableContainer sx={{ marginBottom: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader?.map((val, i) => (
              <TableCell align={i == 0 ? 'left' : 'right'} key={i}>
                {val}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {emissions.map((emission) => (
            <TableRow key={emission.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {emission.emissionFactor?.label}
              </TableCell>
              <TableCell align="right">{toLocaleString(Number(emission.value))}</TableCell>
              <TableCell align="right">
                {toLocaleString(Number(emission.emissionFactor?.value)) +
                  ' ' +
                  t('kgCO₂e') +
                  '/' +
                  emission.emissionFactor?.unit}
              </TableCell>
              <TableCell align="right">{emission.emissionFactor?.uncertainty?.toString() ?? ''}</TableCell>
              <TableCell align="right">{toLocaleString(Number(emission.total))}</TableCell>
              <TableCell align="right">
                <ConfirmationDialog
                  title={t('confirmTitle')}
                  description={t('confirmDelete')}
                  response={() => {
                    handleDelete(emission)
                  }}
                >
                  {(showDialog: () => void) => (
                    <IconButton onClick={showDialog}>
                      <CancelPresentationOutlined sx={{ color: 'red' }} />
                    </IconButton>
                  )}
                </ConfirmationDialog>
              </TableCell>
            </TableRow>
          ))}
          {emissions.length > 0 ? (
            <TableRow>
              <TableCell>
                <strong>{t('totalValue')}</strong>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <strong>{toLocaleString(totalValues)}</strong>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
