'use client'


import '../i18n';
import dynamic from 'next/dynamic';
const Greetings = dynamic(() => import('../components/greetings').then(module => module.Greetings), { ssr: false });

export default function Dashboard() {

    if (true) {
        return <h1>TEST</h1>
        
        return <Greetings />
            ;
    }
    return (
        <>
            <h1>You need to create an account first!</h1>
        </>
    );
};
