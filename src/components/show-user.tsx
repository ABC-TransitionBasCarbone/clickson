import { User } from "@/types/user";
import { getCurrentUser } from "../../lib/api";
import { useEffect, useState } from "react";

export const ShowUser = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function getUser() {
            const userTmp = await getCurrentUser();
            setUser(userTmp);
        }
        getUser();
    }, []);


    return (
        <h1>Vous êtes connecté en tant que : {user?.email}</h1>
    )
};
