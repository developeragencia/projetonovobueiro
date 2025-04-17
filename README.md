# Marketing Dashboard

Sistema de gestão e otimização de campanhas de marketing digital, desenvolvido para profissionais que trabalham com tráfego pago.

## Funcionalidades Principais

- **Dashboard Inteligente**: Visão completa e intuitiva de todas as métricas da operação
- **Otimização Rápida**: Identificação rápida do desempenho de campanhas com ajustes diretos
- **Múltiplos Dashboards**: Organização flexível de métricas por produto ou necessidade
- **Duplicação de Campanhas**: Duplicação de campanhas lucrativas entre contas com um clique
- **Regras Automatizadas**: Otimização automática de campanhas baseada em regras
- **Segurança de Dados**: Proteção de informações através de criptografia
- **Integração com Plataformas**: Suporte para múltiplas plataformas de anúncios e vendas
- **Configuração de UTMs**: Suporte para configuração de códigos UTM e scripts de rastreamento

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Redis
- Facebook Ads API
- Google Ads API
- TikTok Ads API

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/marketing-dashboard.git
cd marketing-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:
```bash
npm run migration:run
```

5. Inicie o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Estrutura do Projeto

```
src/
  ├── domain/           # Regras de negócio e entidades
  │   ├── entities/
  │   ├── repositories/
  │   ├── services/
  │   └── value-objects/
  │
  ├── application/      # Casos de uso da aplicação
  │   ├── use-cases/
  │   └── dtos/
  │
  ├── infrastructure/   # Implementações concretas
  │   ├── config/
  │   ├── repositories/
  │   ├── services/
  │   └── integrations/
  │
  ├── presentation/     # Interface com usuário
  │   ├── controllers/
  │   ├── middlewares/
  │   └── routes/
  │
  └── shared/          # Código compartilhado
      ├── errors/
      └── utils/
```

## Documentação

- [Guia de Arquitetura](docs/arquitetura.md)
- [Guia de Boas Práticas](docs/boas-praticas.md)
- [API Reference](docs/api.md)

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 