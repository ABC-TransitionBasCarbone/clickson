"use client"; // This is a client component 👈🏽

import { Grid, Input, FormGroup, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoadingButton } from '@mui/lab';
import React from 'react';

type Inputs = {
    username: string
    password: string
}


// TODO On click send new password
// TODO get token

export default function SignIn() {
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const { control } = useForm({
        defaultValues: {
            password: "",
            username: "romain.crevecoeur@abc-transitionbascarbone.fr",
        },
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setLoading(!loading)

        const response = await fetch('http://localhost:4000/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                'username': data.username,
                'password': data.password
            })
        })
        // Handle response if necessary
        const status = response.status
        const ok = response.ok
        console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ ok:", ok)
        console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ status:", status)
        // ...
    }


    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
    >
        <Grid item xs={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Controller
                        name="username"
                        control={control}
                        render={() => <Input {...register("username")} />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={() => <Input {...register("password")} />}
                    />
                    {errors.password && <span>This field is required</span>}
                    <LoadingButton type="submit" loading={loading} variant="contained" endIcon={<SendIcon />}>
                        Connexion
                    </LoadingButton>
                </FormGroup>
            </form>
        </Grid>
    </Grid>;
}