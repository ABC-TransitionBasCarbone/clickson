"use client"; // This is a client component 👈🏽

import { Grid, Input, FormGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { TextField } from '@material-ui/core';

type Inputs = {
    username: string
    password: string
}


// TODO On click send new password
// TODO get token

export default function SignIn() {
    const [loading, setLoading] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const { control } = useForm({
        defaultValues: {
            password: "",
            username: "",
        },
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {

        // setLoading((prevLoading) => !prevLoading)

        // const response = await fetch('http://localhost:4000/auth/signin', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'username': data.username,
        //         'password': data.password
        //     }),
        // })

        setConnected((prevLoading) => {
                console.log("🚀 ~ setConnected ~ prevLoading:", prevLoading)
                console.log("🚀 ~ setConnected ~ !prevLoading:", !prevLoading)

            return true
        })
        console.log("🚀 ~ SignIn ~ connected:", connected)

        // setLoading((prevLoading) => !prevLoading)
    }


    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
    >
        <Grid item xs={3} sx={{ minWidth: '40vh' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup id='signin'>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: true }}
                        render={() => <TextField {...register("username")} placeholder="Email" />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={() => <TextField {...register("password")} type="password"
                            placeholder="Mot de passe" />}
                    />
                    {errors.password && <span>This field is required</span>}
                    <LoadingButton type="submit" loading={loading} variant="contained" endIcon={<SendIcon />}>
                        Connexion {connected.toString()}
                    </LoadingButton>

                </FormGroup>

            </form>
            <button onClick={() => setCount(count + 1)}>{count}</button>

        </Grid>
    </Grid >;
}