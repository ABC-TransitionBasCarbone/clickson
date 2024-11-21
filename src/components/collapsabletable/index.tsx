'use client'

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Session } from '@/src/types/Session';
import { Fragment, useState, useEffect, FormEvent } from 'react';
import MultipleSelectChip from './SelectChip';
import DeleteIcon from '@mui/icons-material/Delete';
import FormCreateGroup from './Form/FormCreateGroup';
import { createGroup, deleteGroupInDatabase, updateGroup } from '@/api/groups';
import { Group } from '@/src/types/Group';
import LinkIcon from '@mui/icons-material/Link';
import { CircularProgress, Switch, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation'
import CopyToClipboard from '../copytoclipboard';

interface CollapsibleTableProps {
    currentSession: Session[];
    deleteSession: (session: Session) => void;
    lockSession: (session: Session) => void;
}
interface CollapsibleTableRowProps {
    session: Session;
    deleteSession: (session: Session) => void;
    lockSession: (session: Session) => void;
}

function Row(props: CollapsibleTableRowProps) {
    const [session, setSession] = useState(props.session);
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false)
    const navigation = useRouter();

    const chipData = [
        { key: 0, label: 'abc-energy', advanced: false },
        { key: 1, label: 'abc-travel', advanced: false },
        { key: 2, label: 'abc-food-service', advanced: false },
        { key: 3, label: 'abc-supplies', advanced: false },
        { key: 4, label: 'abc-fixed-assets', advanced: false },
        { key: 5, label: 'abc-travel', advanced: false },
        { key: 6, label: 'abc-energy', advanced: true },
        { key: 7, label: 'abc-travel', advanced: true },
        { key: 8, label: 'abc-food-service', advanced: true },
        { key: 9, label: 'abc-supplies', advanced: true },
        { key: 10, label: 'abc-fixed-assets', advanced: true },
        { key: 11, label: 'abc-travel', advanced: true },
    ]

    async function handleCreateGroup(event: FormEvent<HTMLFormElement>) {
        setLoading(true)
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        if (formData.get("groupName") === null) {
            return
        }
        const group = await createGroup(formData.get("groupName")?.toString() || "", session)
        setSession({ ...session, groups: session.groups ? [...session.groups, group] : [group] });
        setLoading(false)

    }

    async function deleteGroup(group: Group) {
        const id = await deleteGroupInDatabase(group)
        setSession({ ...session, groups: session.groups?.filter(g => g.id !== id) })
    }

    async function updateGroupRights(rights: Rights[], group: Group) {
        await updateGroup({ ...group, rights: rights.map(r => r.key) })
    }

    return session && <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell >{session.name}</TableCell>
            <TableCell >{session.year + ' - ' + (session.year + 1)}</TableCell>
            <TableCell>
                <Tooltip title="Lock the session">
                    <Switch checked={session.locked} onClick={() => (props.lockSession(session), setSession({ ...session, locked: !session.locked }))} />
                </Tooltip>
                <Tooltip title="Delete the session">
                    <IconButton aria-label="delete" onClick={() => props.deleteSession(session)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Groups
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom</TableCell>
                                    <TableCell >Actions</TableCell>
                                    <TableCell >Affecter à la session</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {session.groups?.map((group) => (
                                    <TableRow key={group.name}>
                                        <TableCell component="th" scope="row">
                                            {group.name}
                                        </TableCell>
                                        <TableCell>

                                            <Tooltip title="Link to the group">
                                                <IconButton aria-label="dashboard" onClick={() => navigation.push("dashboard/" + group.id)}>
                                                    <LinkIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete the group">
                                                <IconButton aria-label="delete" onClick={() => deleteGroup(group)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <CopyToClipboard shortUrl={group.id} />
                                        </TableCell>
                                        <TableCell align="right" >
                                            <MultipleSelectChip
                                                groupRights={group.rights}
                                                rights={chipData}
                                                setRights={(event) => updateGroupRights(event, group)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow >
                                    <TableCell>
                                        {
                                            loading ? <CircularProgress />
                                                : <FormCreateGroup handleCreateGroup={handleCreateGroup} />
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </Fragment>;
}

export default function CollapsibleTable(props: CollapsibleTableProps) {
    const [currentSessions, setCurrentSessions] = useState<Session[]>([]);

    useEffect(() => {
        setCurrentSessions(props.currentSession.filter(session => !session.archived));
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell >Nom</TableCell>
                        <TableCell >Année</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentSessions.map((session) => (
                        <Row key={session.name}
                            session={session}
                            deleteSession={props.deleteSession}
                            lockSession={props.lockSession} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
