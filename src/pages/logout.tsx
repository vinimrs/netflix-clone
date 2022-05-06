import { useRouter } from 'next/router';
import React from 'react';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from '../services/auth/tokenService';
import Head from 'next/head';

export default function LogoutPage() {
  const router = useRouter();
  // Pàra rodar somente no client, pois não daria para redirecionar no servidor
  React.useEffect(() => {
    try {
      HttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh`, {
        method: 'DELETE',
      }).then(() => {
        tokenService.delete();
        router.push('/login');
      });
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Netflix - Logout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h2>Você será redirecionado em instantes...</h2>
    </>
  );
}
