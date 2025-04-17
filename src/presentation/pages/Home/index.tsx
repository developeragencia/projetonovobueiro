import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TrendingUp,
  Speed,
  Timeline,
  AutoGraph,
  Security,
  Hub,
  Dashboard,
  Campaign,
  Payment,
  ShoppingCart,
  CreditCard,
  AccountBalance,
  Assessment,
  Settings,
  Notifications
} from '@mui/icons-material';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simula carregamento inicial
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Mostra conteúdo com delay para animação
    setTimeout(() => {
      setShowContent(true);
    }, 2500);
  }, []);

  const recursos = [
    {
      titulo: 'Dashboard Inteligente',
      descricao: 'Visualize todos os seus dados de marketing em um único lugar com insights em tempo real.',
      icone: <Dashboard className="w-8 h-8 text-blue-500" />
    },
    {
      titulo: 'Otimização Rápida',
      descricao: 'Otimize suas campanhas automaticamente com base em regras personalizadas e machine learning.',
      icone: <Speed className="w-8 h-8 text-green-500" />
    },
    {
      titulo: 'Métricas Avançadas',
      descricao: 'Acompanhe ROAS, CPA, CTR e outras métricas importantes para suas campanhas.',
      icone: <Timeline className="w-8 h-8 text-purple-500" />
    },
    {
      titulo: 'Gestão de Campanhas',
      descricao: 'Gerencie todas as suas campanhas de diferentes plataformas em um único lugar.',
      icone: <Campaign className="w-8 h-8 text-orange-500" />
    },
    {
      titulo: 'Segurança Garantida',
      descricao: 'Seus dados estão seguros com nossa infraestrutura de última geração.',
      icone: <Security className="w-8 h-8 text-red-500" />
    },
    {
      titulo: 'Integrações',
      descricao: 'Conecte-se facilmente com Facebook Ads, Google Ads, TikTok Ads e mais.',
      icone: <Hub className="w-8 h-8 text-indigo-500" />
    }
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4 animate-pulse">
            Marketing Dashboard
          </h1>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Marketing Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Plataforma de gestão e otimização de campanhas de marketing digital
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TrendingUp color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Campanhas Ativas
                    </Typography>
                  </Box>
                  <Typography variant="h4">12</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleNavigate('/campaigns')}>
                    Ver Campanhas
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Speed color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Performance
                    </Typography>
                  </Box>
                  <Typography variant="h4">2.8x</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleNavigate('/performance')}>
                    Ver Performance
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Timeline color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Métricas
                    </Typography>
                  </Box>
                  <Typography variant="h4">85%</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleNavigate('/metrics')}>
                    Ver Métricas
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Assessment color="primary" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Relatórios
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Acesse relatórios detalhados sobre suas campanhas e performance.
                </Typography>
                <Button variant="contained" onClick={() => handleNavigate('/reports')}>
                  Ver Relatórios
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Settings color="primary" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Configurações
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Configure suas integrações e preferências do sistema.
                </Typography>
                <Button variant="contained" onClick={() => handleNavigate('/settings')}>
                  Ir para Configurações
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in-down">
              <span className="block">Marketing Dashboard</span>
              <span className="block text-blue-400">Otimize suas campanhas</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-fade-in-up">
              Gerencie todas as suas campanhas de marketing digital em um único lugar. 
              Otimize seus resultados com insights em tempo real e automação inteligente.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 animate-fade-in">
              <div className="rounded-md shadow">
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 transform hover:scale-105 transition-all duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Acessar Dashboard
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={() => handleNavigate('/campanhas')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-blue-300 text-base font-medium rounded-md text-white hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Ver Campanhas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="py-12 bg-opacity-10 bg-white backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Métricas</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Resultados que Importam
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white bg-opacity-10 overflow-hidden shadow-lg rounded-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-300 truncate">ROAS Médio</dt>
                  <dd className="mt-1 text-3xl font-semibold text-blue-400">2.8x</dd>
                  <div className="mt-2 flex items-center text-sm text-green-400">
                    <TrendingUp className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    <span>+12% vs mês anterior</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 overflow-hidden shadow-lg rounded-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-300 truncate">Conversões</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-400">1.2k</dd>
                  <div className="mt-2 flex items-center text-sm text-green-400">
                    <TrendingUp className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    <span>+8% vs mês anterior</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 overflow-hidden shadow-lg rounded-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-300 truncate">CPA Médio</dt>
                  <dd className="mt-1 text-3xl font-semibold text-purple-400">R$ 42,50</dd>
                  <div className="mt-2 flex items-center text-sm text-green-400">
                    <TrendingUp className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    <span>-5% vs mês anterior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recursos */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Recursos</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Tudo que você precisa para otimizar suas campanhas
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {recursos.map((recurso, index) => (
                <div 
                  key={index} 
                  className="bg-white bg-opacity-10 overflow-hidden shadow-lg rounded-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">{recurso.icone}</div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-white">
                          {recurso.titulo}
                        </h3>
                        <p className="mt-2 text-base text-gray-300">
                          {recurso.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integrações */}
      <div className="py-16 bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Integrações</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Todas as Plataformas de Pagamento
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
              Integre seu negócio com as principais plataformas de pagamento do mercado.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {/* Hubla */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/hubla.png" alt="Hubla" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Hubla</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Gestão financeira completa para seu negócio
              </p>
            </div>

            {/* Monetizze */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/monetizze.png" alt="Monetizze" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Monetizze</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Plataforma de afiliados e produtos digitais
              </p>
            </div>

            {/* InovaPag */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/inovapag.png" alt="InovaPag" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">InovaPag</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Soluções inovadoras em pagamentos
              </p>
            </div>

            {/* WooCommerce */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/woocommerce.png" alt="WooCommerce" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">WooCommerce</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Plataforma de e-commerce para WordPress
              </p>
            </div>

            {/* Perfect Pay */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/perfectpay.png" alt="Perfect Pay" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Perfect Pay</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Checkout transparente e seguro
              </p>
            </div>

            {/* Logzz */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/logzz.png" alt="Logzz" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Logzz</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Gestão logística integrada
              </p>
            </div>

            {/* Greenn */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/greenn.png" alt="Greenn" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Greenn</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Soluções sustentáveis em pagamentos
              </p>
            </div>

            {/* Doppus */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/doppus.png" alt="Doppus" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Doppus</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Pagamentos digitais simplificados
              </p>
            </div>

            {/* Cinq Pay */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/cinqpay.png" alt="Cinq Pay" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Cinq Pay</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Soluções completas em pagamentos
              </p>
            </div>

            {/* TriboPay */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/tribopay.png" alt="TriboPay" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">TriboPay</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Pagamentos para comunidades
              </p>
            </div>

            {/* Kiwify */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/kiwify.png" alt="Kiwify" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Kiwify</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Plataforma para produtos digitais
              </p>
            </div>

            {/* Eduzz */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/eduzz.png" alt="Eduzz" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Eduzz</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Marketplace de produtos digitais
              </p>
            </div>

            {/* Octus Pay */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20">
              <div className="flex items-center justify-center h-16 w-16 mx-auto">
                <img src="/images/octuspay.png" alt="Octus Pay" className="h-12" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white text-center">Octus Pay</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Soluções financeiras inteligentes
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300">
              Todas as integrações são atualizadas automaticamente e em tempo real
            </p>
            <button
              onClick={() => handleNavigate('/integracoes')}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
            >
              Ver todas as integrações
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Pronto para começar?</span>
            <span className="block text-blue-400">Otimize suas campanhas hoje mesmo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => handleNavigate('/dashboard')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
              >
                Acessar Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilo Global */}
      <style jsx global>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
} 