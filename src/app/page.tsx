"use client"; // This is a client component 👈🏽

import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import React, { useState } from 'react'

// import Engine from 'publicodes'

// const engine = new Engine(rules)
// const test = engine.evaluate("alimentation . boisson . alcool . facteur bière")

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';

import './i18n';
import dynamic from 'next/dynamic';
const Greetings = dynamic(() => import('../components/greetings').then(module => module.Greetings), { ssr: false });

const platsVegetarien = rules['alimentation . plats . végétarien . empreinte'];
const platsViandeBlanche = rules['alimentation . plats . viande blanche . empreinte'];
const platsViandeRouge = rules['alimentation . plats . viande rouge . empreinte'];

export default function Home() {
  const [empreinteVegetarien, setEmpreinteVegetarien] = useState(0);
  const [empreinteViandeBlanche, setEmpreinteViandeBlanche] = useState(0);
  const [empreinteViandeRouge, setEmpreinteViandeRouge] = useState(0);
  const [empreinteMoyenne, setEmpreinteMoyenne] = useState(0);


  const changeEmpreinteVegetarien = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpreinteVegetarien(parseInt(event.target.value));
  };
  const changeEmpreinteViandeBlanche = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpreinteViandeBlanche(parseInt(event.target.value));
  };
  const changeEmpreinteViandeRouge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpreinteViandeRouge(parseInt(event.target.value));
  };
  const changeEmpreinteMoyenne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpreinteMoyenne(parseInt(event.target.value));
  };

  return (
    <><main style={{ margin: 10 }}>
      <h1>Clickson</h1>

      
      <Greetings />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>RESTAURATION - CANTINE</h1>
          </Grid>
          <Grid xs={4}>
            Nous allons ici calculer les émissions liées aux repas servis à la cantine, au self ou au restaurant de ton établissement. Attention, il faut que tu calcules tous les repas pour une année ! Nous te conseillons de calculer sur la période de Janvier à Décembre!
          </Grid>

          <Grid xs={4}>
            <Tooltip title={platsVegetarien.note}>
              <p>
                {platsVegetarien.titre}  ({platsVegetarien.unité})<br />
                Facteur d&prime;émission ADEME: {platsVegetarien.formule}<br />
                Facteur d&prime;émission PEBC: 0.45<br />
                Incertitude: 4
              </p>
            </Tooltip>
            <Input
              onChange={changeEmpreinteVegetarien}
              value={empreinteVegetarien} /> Repas<br />
            Calcul de l&prime;empreinte globale : {empreinteVegetarien * platsVegetarien.formule} kgCO2
            <br /><br />
            <Tooltip title={platsViandeRouge.note}>
              <p>
                {platsViandeRouge.titre}  ({platsViandeRouge.unité})<br />
                Facteur d&prime;émission ADEME: {platsViandeRouge.formule}<br />
                Facteur d&prime;émission PEBC: 1.58 <br />
                Incertitude: 4
              </p>
            </Tooltip>
            <Input
              onChange={changeEmpreinteViandeRouge}
              value={empreinteViandeRouge}
              /> Repas<br />
            Calcul de l&prime;empreinte globale : {empreinteViandeRouge * platsViandeRouge.formule} kgCO2

          </Grid>

          <Grid xs={4}>
            <Tooltip title={platsViandeBlanche.note}>

              <p>
                {platsViandeBlanche.titre}  ({platsViandeBlanche.unité})<br />
                Facteur d&prime;émission ADEME: {platsViandeBlanche.formule}<br />
                Facteur d&prime;émission PEBC: 7.26<br />
                Incertitude: 4
              </p>
            </Tooltip>
            <Input
              onChange={changeEmpreinteViandeBlanche}
              value={empreinteViandeBlanche} /> Repas<br />
            Calcul de l&prime;empreinte globale : {empreinteViandeBlanche * platsViandeBlanche.formule} kgCO2
            <br /><br />
            <p>
              Repas moyen (kgCO2e/meal)<br />
              Facteur d&prime;émission ADEME: Pas dispo ??<br />
              Facteur d&prime;émission PEBC: 2.25<br />
              Incertitude: 4
            </p>
            <Input
              onChange={changeEmpreinteMoyenne}
              value={empreinteMoyenne} /> Repas<br />
            Calcul de l&prime;empreinte globale : {empreinteMoyenne * 2.25} kgCO2

          </Grid>
        </Grid>
      </Box>
    </main ></>
      );

}
