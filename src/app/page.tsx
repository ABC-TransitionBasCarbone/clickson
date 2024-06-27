"use client"; // This is a client component 👈🏽
import React, { useState } from 'react'


import './i18n';
import dynamic from 'next/dynamic';
import LoginForm from '@/components/login-form';
const Greetings = dynamic(() => import('../components/greetings').then(module => module.Greetings), { ssr: false });

export default function App() {

  return (
    <><main style={{ margin: 10 }}>
      <h1>Clickson</h1>

      <LoginForm />

      {/* <Greetings /> */}
    </main ></>
  );

}
