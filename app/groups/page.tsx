'use client'

import '../i18n';
import { Header } from "@/app/components/dashboard/header";
import Container from '@mui/material/Container';
import { Box, Button, CircularProgress, FormControl, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import React, { FormEvent, useEffect, useState } from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useTranslation } from "react-i18next";
import { Group } from '../types/Group';
import { User } from '../types/User';
import Establishment from '../components/establishment/Establishment';
import { styled } from "@mui/system";
import { getUserCookies, getAuthenticatedUserData } from '@/api/auth';
import { createGroup, deleteGroup, getGroups } from '@/api/groups';

const CustomContainer = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background-color: white;
`

const AccueilWrapper = styled(Box)`
    margin-top: 150px;
    a { color: #6d6d6d; }
    a:hover { color: black; }
`

export default function Groups() {
    const theme = useTheme();

    const [currentGroup, setCurrentGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleDeleteCurrentGroup = async (g: Group) => {
        const id = await deleteGroup(g)
        setCurrentGroups(currentGroup.filter(g => g.id !== id))
    }

    const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);

        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (formData.get("groupName") === null) {
            return
        }
        const userSession = await getUserCookies()
        const group = await createGroup(formData.get("groupName")?.toString() || "", user.user_email, userSession.school.id)
        setCurrentGroups(currentGroup.concat(group))
        setLoading(false);
    }

    const columnsCurrent = [
        { field: 'id', headerName: t('abc-id'), width: 90 },
        { field: 'name', headerName: 'Nom du groupe', minWidth: 400 },
        {
            field: 'action',
            headerName: t('abc-actions'),
            minWidth: 300,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (group: any) => {
                const onDelete = () => {
                    handleDeleteCurrentGroup(group.row);
                };

                return (
                    <Box>
                        <Button type='button' color='primary' href={'groups/' + group.row.id}>Accès Groupe</Button>
                        <ConfirmationDialog
                            title={t('abc-confirm-title')}
                            description={t('abc-confirm-delete')}
                            response={onDelete}
                        >
                            {(showDialog: any) => (
                                <Button type='button' color='error' onClick={showDialog}>{t('abc-delete')}</Button>
                            )}
                        </ConfirmationDialog>
                    </Box>
                );
            },
        }
    ];

    const localeText = {
        columnMenuSortAsc: t('abc-column-menu-sort-asc'),
        columnMenuSortDesc: t('abc-column-menu-sort-desc'),
        columnMenuFilter: t('abc-column-menu-filter'),
        columnMenuHideColumn: t('abc-column-menu-hide-column'),
        columnMenuShowColumns: t('abc-column-menu-show-columns'),
        columnMenuManageColumns: t('abc-column-menu-manage-columns'),
        columnMenuShowHideAll: t('abc-column-menu-show-hide-all'),
    };

    const [user, setUser] = useState<User>({} as User)


    const fetchSessionAndGroups = async () => {
        setLoading(true);
        const userSession = await getUserCookies()
        setUser(userSession)
        await getAuthenticatedUserData(userSession.user_email);

        const groups = await getGroups(userSession.user_email)
        setCurrentGroups(groups.filter(g => !g.archived && !g.deleted));
        setLoading(false);
    }

    useEffect(() => {
        fetchSessionAndGroups()
    }, []);


    return (
        <>
            <div>
                <CustomContainer>
                    <Header />
                </CustomContainer>
            </div>

            <Container maxWidth="xl">
                <AccueilWrapper>

                    <Establishment />

                    <h2>Mes groupes d'élèves</h2>
                    <DataGrid
                        rows={currentGroup}
                        columns={columnsCurrent}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[1, 5]}
                        disableRowSelectionOnClick
                        localeText={localeText}
                    />
                    {loading ? <CircularProgress /> :

                        <form onSubmit={handleCreateGroup}>
                            <FormControl
                                sx={{
                                    marginTop: theme.spacing(1),
                                    marginBottom: theme.spacing(1)
                                }}>
                                <div>
                                    <OutlinedInput placeholder='Nom du groupe'
                                        type="text"
                                        name="groupName"
                                    />
                                    <Button type="submit"><AddIcon color='primary' />Créer un groupe</Button>
                                </div>
                            </FormControl>
                        </form>}

                </AccueilWrapper>
            </Container>

        </>
    )
};
