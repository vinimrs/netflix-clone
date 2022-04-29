import { useRouter } from 'next/router';
import React from 'react';
import nookies from 'nookies';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import { authService } from '../services/auth/authService';
import { tokenService } from '../services/auth/tokenService';

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

    return <h2>Você será redirecionado em instantes...</h2>;
}
