# Guia Digital do Hóspede + Painel Admin Financeiro (Airbnb Foz do Iguaçu)

Sistema web completo para anfitriões de Airbnb em Foz do Iguaçu (PR), composto por um **Guia Digital do Hóspede** (mobile-first, moderno e acolhedor) e um **Painel Administrativo Financeiro** com controle de reservas, despesas, calendário de ocupação e editor de conteúdo em tempo real (sem necessidade de redeploy).

---

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React 19 + Vite
- **Estilização:** Tailwind CSS v4 (Paleta terrosa/rosé com tipografia *Playfair Display* e *Plus Jakarta Sans*)
- **Ícones:** Lucide React (estilo line-art minimalista)
- **Roteamento:** React Router DOM
- **Backend & Dados:** Firebase (Firestore para conteúdo e dados financeiros, Firebase Auth para o admin, Firebase Storage para mídias)

---

## 📂 Estrutura de Rotas

### Guia do Hóspede (Público)
- `/` — Página inicial do guia com botão de cópia de senha do Wi-Fi, horários de check-in/out e grade dos 18 ícones de seções.
- `/secao/:id` — Detalhes da seção selecionada (ex: `coisas-para-fazer`, `cafes-e-padarias`, `regras-da-casa`).

### Painel do Anfitrião (Restrito)
- `/admin/login` — Autenticação do anfitrião (Firebase Auth com suporte a modo demonstração em 1 clique).
- `/admin` — Dashboard financeiro do mês (Receita em caixa `amountPaid`, despesas, lucro líquido e taxa de ocupação diária) + Calendário de Ocupação.
- `/admin/reservas` — CRUD de Reservas e Bloqueios (manutenção/limpeza), com controle de status de pagamento (`pago`, `parcial`, `pendente`) e datas `YYYY-MM-DD`.
- `/admin/despesas` — CRUD de Despesas por categoria (`limpeza`, `brindes`, `manutencao`, `taxas`, `outros`).
- `/admin/conteudo` — Editor em tempo real do guia do hóspede (textos, dados da casa e cards com fotos) sem necessidade de novo deploy.

---

## 💻 Como Rodar o Projeto Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

3. **Gerar build de produção:**
   ```bash
   npm run build
   ```

---

## 🔑 Configuração das Variáveis de Ambiente do Firebase

Copie o arquivo `.env.example` para `.env` e preencha com as credenciais do seu projeto no [Console do Firebase](https://console.firebase.google.com/):

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

> **Nota:** Se as variáveis do Firebase não estiverem configuradas, o sistema ativa automaticamente uma camada de persistência local (`LocalStorage`) com o catálogo completo de dados de exemplo de Foz do Iguaçu, permitindo testes completos e demonstração instantânea.
