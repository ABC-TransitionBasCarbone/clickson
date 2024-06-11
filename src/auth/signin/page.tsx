
"use client"; // This is a client component 👈🏽

import React from 'react';

type Inputs = {
    username: string
    password: string
}


// TODO On click send new password
// TODO get token

export default function SignIn() {
    const [loading, setLoading] = React.useState(false);
    const [connected, setConnected] = React.useState(false);

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
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setLoading((prevLoading) => !prevLoading)

        const response = await fetch('http://localhost:4000/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                'username': data.username,
                'password': data.password
            }),
        })

        setConnected((prevLoading) => {
            console.log("🚀 ~ setConnected ~ prevLoading:", prevLoading)
            console.log("🚀 ~ setConnected ~ !prevLoading:", !prevLoading)

            return true
        })
        console.log("🚀 ~ SignIn ~ connected:", connected)

        setLoading((prevLoading) => !prevLoading)
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
                <FormGroup >
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: true }}
                        render={() => <Input {...register("username")} placeholder="Email" />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={() => <Input {...register("password")} placeholder="Mot de passe" />}
                    />
                    {errors.password && <span>This field is required</span>}
                    <LoadingButton sx={{ m: 2 }} type="submit" loading={loading} variant="contained" endIcon={<SendIcon />}>
                        Connexion {connected}
                    </LoadingButton>

                </FormGroup>
            </form>
        </Grid>
    </Grid>;
}