'use client'

import { createGroup, deleteGroupInDatabase, updateGroup } from '@/services/serverFunctions/group'
import {
  Delete,
  Inventory,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Lock,
  LockOpen,
  Login,
  Unarchive,
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Groups, SessionStudents } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import ConfirmationDialog from '../ConfirmationDialog'
import CopyToClipboard from '../copytoclipboard'
import FormCreateGroup from './Form/FormCreateGroup'
import MultipleSelectChip from './SelectChip'

interface CollapsibleTableProps {
  currentSession: SessionStudents[]
  deleteSession: (session: SessionStudents) => void
  archiveSession: (session: SessionStudents) => void
  lockSession: (session: SessionStudents) => void
  modifySessionName?: (session: SessionStudents) => void
}
interface RowProps {
  session: SessionStudents & { groups?: Groups[] }
  deleteSession: (session: SessionStudents) => void
  archiveSession: (session: SessionStudents) => void
  lockSession: (session: SessionStudents) => void
  modifySessionName?: (session: SessionStudents) => void
}

function Row(props: RowProps) {
  const [session, setSession] = useState(props.session)
  const [open, setOpen] = useState(!props.session.archived)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('session')

  const chipData = [
    { key: 1, label: 'energy', advanced: false },
    { key: 2, label: 'foodService', advanced: false },
    { key: 3, label: 'travel', advanced: false },
    { key: 4, label: 'supplies', advanced: false },
    { key: 5, label: 'fixedAssets', advanced: false },
    { key: 6, label: 'energy', advanced: true },
    { key: 7, label: 'foodService', advanced: true },
    { key: 8, label: 'travel', advanced: true },
    { key: 9, label: 'supplies', advanced: true },
    { key: 10, label: 'fixedAssets', advanced: true },
  ]

  async function handleCreateGroup(event: FormEvent<HTMLFormElement>) {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (formData.get('groupName') === null) {
      return
    }
    const group = await createGroup(formData.get('groupName')?.toString() || '', session)
    setSession({ ...session, groups: session.groups ? session.groups?.concat([group]) : [group] })
    setLoading(false)
  }

  async function deleteGroup(group: Groups) {
    const id = await deleteGroupInDatabase(group)
    setSession({ ...session, groups: session.groups?.filter((g) => g.id !== id) })
  }

  async function updateGroupRights(rights: Rights[], group: Groups) {
    await updateGroup({ ...group, rights: rights.map((r) => r.key) })
  }

  const handleSessionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSession({ ...session, name: event.target.value })
    props.modifySessionName && props.modifySessionName({ ...session, name: event.target.value })
  }

  return (
    session && (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell width={1}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell width={370}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              value={session.name}
              onChange={handleSessionNameChange}
            />
          </TableCell>
          <TableCell width={250}>
            <Tooltip title={t('linkAdmin')}>
              <IconButton aria-label="dashboard" onClick={() => router.push('dashboard/' + session.groups?.[0]?.id)}>
                <Login />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('locked')}>
              <Switch
                checkedIcon={<Lock />}
                icon={<LockOpen sx={{ color: 'green', borderRadius: 10 }} />}
                checked={session.locked}
                color="error"
                onClick={() => (props.lockSession(session), setSession({ ...session, locked: !session.locked }))}
              />
            </Tooltip>
            <ConfirmationDialog
              title={t('confirmTitle')}
              description={session.archived ? t('unarchive') : t('sessionArchiveConfirm')}
              response={() => props.archiveSession(session)}
            >
              {(showDialog: () => void) => (
                <Tooltip title={session.archived ? t('unarchive') : t('archive')}>
                  <IconButton onClick={showDialog}>{session.archived ? <Unarchive /> : <Inventory />}</IconButton>
                </Tooltip>
              )}
            </ConfirmationDialog>
            <ConfirmationDialog
              title={t('confirmTitle')}
              description={t('sessionDeleteConfirm')}
              response={() => props.deleteSession(session)}
            >
              {(showDialog: () => void) => (
                <Tooltip title={t('delete')}>
                  <IconButton color="error" onClick={showDialog}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </ConfirmationDialog>
          </TableCell>
          <TableCell>{session.year + ' - ' + (session.year + 1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {t('groups')}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('nameGroup')}</TableCell>
                      <TableCell>{t('actions')}</TableCell>
                      <TableCell>{t('affect')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {session.groups?.map((group, index) => {
                      if (index === 0) {
                        return
                      }
                      return (
                        <TableRow key={group.name}>
                          <TableCell component="th" scope="row">
                            {group.name}
                          </TableCell>
                          <TableCell width={250}>
                            <Tooltip title={t('link')}>
                              <IconButton aria-label="dashboard" onClick={() => router.push('dashboard/' + group.id)}>
                                <Login />
                              </IconButton>
                            </Tooltip>
                            <CopyToClipboard shortUrl={group.id} />
                            <ConfirmationDialog
                              title={t('confirmTitle')}
                              description={t('groupDeleteConfirm')}
                              response={() => deleteGroup(group)}
                            >
                              {(showDialog: () => void) => (
                                <Tooltip title={t('deleteLinkGroup')}>
                                  <IconButton color="error" onClick={showDialog}>
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </ConfirmationDialog>
                          </TableCell>
                          <TableCell>
                            <MultipleSelectChip
                              groupRights={group.rights}
                              rights={chipData}
                              setRights={(event) => updateGroupRights(event, group)}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow>
                      <TableCell>
                        {!session.archived &&
                          (loading ? <CircularProgress /> : <FormCreateGroup handleCreateGroup={handleCreateGroup} />)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    )
  )
}

export default function CollapsibleTable({
  currentSession,
  deleteSession,
  archiveSession,
  lockSession,
  modifySessionName,
}: CollapsibleTableProps) {
  const t = useTranslations('session')

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={3} />
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('actions')}</TableCell>
            <TableCell>{t('year')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentSession.map((session) => (
            <Row
              key={session.name}
              session={session}
              deleteSession={deleteSession}
              archiveSession={archiveSession}
              lockSession={lockSession}
              modifySessionName={modifySessionName}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
