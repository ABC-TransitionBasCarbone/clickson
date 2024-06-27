
"use client"; // This is a client component 👈🏽

import React from 'react';
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'

const platsVegetarien = rules['alimentation . plats . végétarien . empreinte'];


export default function SignIn() {

    return <div> <h1>Calculateur</h1>
        {platsVegetarien.note}</div>;
}