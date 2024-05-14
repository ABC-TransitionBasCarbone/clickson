"use client"; // This is a client component 👈🏽

import { Grid } from '@mui/material';

// TODO On click send new password
// TODO get token

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    username: string
    password: string
}

export default function SignIn() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ data:", data)
        const response = await fetch('http://localhost:4000/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                'email': 'romain.crevecoeur@abc-transitionbascarbone.fr',
                'password': '14747'
            })
        })
        console.log("🚀 ~ onSubmit ~ response:", response)

        // Handle response if necessary
        await response
        console.log("🚀 ~ onSubmit ~ data:", data)
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
                <input defaultValue="romain.crevecoeur@abc-transitionbascarbone.fr" {...register("username")} />
                <input {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </Grid>
    </Grid>;
}