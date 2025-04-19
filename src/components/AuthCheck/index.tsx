import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Aqui você implementaria a lógica real de verificação de autenticação
    const isAuthenticated = true; // Simulando que o usuário está autenticado
    
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthCheck; 