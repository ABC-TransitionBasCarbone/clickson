'use client';

import { Category } from "@/src/types/Category";
import { Grid, Switch, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useTranslations } from 'next-intl'
import { Lock, LockOpen } from '@mui/icons-material';
import { ChangeEvent, useState } from "react";
import { lockedSessionCategory } from "@/api/sessions";
import { User } from "@/src/types/User";
import theme from "@/src/app/theme";

const OngoingButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: 'white !important',
    fontSize: 16,
    textTransform: "capitalize",
    minWidth: 120,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    border: '0',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}));


interface CategoryItemProps {
    category: Category,
    borderColor: string,
    user: User
}

export const CategoryItem = (props: CategoryItemProps) => {
    const t = useTranslations('dashboard');
    const [locked, setLocked] = useState(props.category.locked);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocked(event.target.checked);
        lockedSessionCategory(props.category.idSessionEmissionCategory, event.target.checked);
    };

    const conatinerStyle = {
        justifyContent: "center",
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
        borderRadius: 3,
        border: `2px solid ${props.borderColor}`,
        display: 'flex'
    }

    return <Grid container xs={12} sm={2} sx={conatinerStyle}>
        <Typography color={theme.palette.primary.main} variant="h5" align={'center'}>{props.category.label}</Typography>
        <Typography marginTop={2} marginBottom={2}>{props.category.detail}</Typography>
        <Grid display={'inline-block'} alignSelf={'flex-end'} >
            <Link href={`/category/` + props.category.idSessionEmissionCategory}>
                <OngoingButton >{t('onGoing')}</OngoingButton>
            </Link>
            {props.user.email && <Switch
                checkedIcon={<Lock />}
                icon={<LockOpen sx={{ color: 'green', borderRadius: 10 }} />}
                checked={locked}
                color="error"
                onChange={handleValueChange} />}

        </Grid>
    </Grid>
}
