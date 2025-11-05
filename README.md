# 🧙‍♂️ Wizard de Cadastro de Fornecedor - Angular

Formulário wizard de múltiplas etapas (5 etapas) para cadastro de fornecedores, desenvolvido em Angular com foco em UX e responsividade.

## ✨ Características

- **5 Etapas de cadastro:**
  1. Informações da Empresa
  2. Dados Bancários
  3. Principais Contatos
  4. Principais Clientes
  5. Informações Fiscais

- **UX/UI Features:**
  - Design responsivo (Desktop ≥1200px, Tablet ≥768px, Mobile <768px)
  - Navegação lateral com indicador de progresso
  - Validação de formulários em tempo real
  - Máscaras para CPF/CNPJ, CEP, Telefone
  - Feedback visual para campos obrigatórios
  - Animações suaves e transições

- **Tecnologias:**
  - Angular 20.3.8 (Standalone Components)
  - TypeScript
  - SCSS (Sass)
  - Reactive Forms
  - RxJS

## 📁 Estrutura do Projeto

```
src/app/pages/cadastro-fornecedor/
├── cadastro-fornecedor-routing-module.ts  # Configuração de rotas
├── cadastro-fornecedor-container/         # Container principal
├── components/
│   └── sidebar-steps/                     # Barra lateral de navegação
├── pages/
│   ├── informacoes-empresa/               # Etapa 1
│   ├── dados-bancarios/                   # Etapa 2
│   ├── principais-contatos/               # Etapa 3
│   ├── principais-clientes/               # Etapa 4
│   └── informacoes-fiscais/               # Etapa 5
├── services/
│   └── wizard.ts                          # Gerenciamento de estado
└── styles/
    └── cadastro-fornecedor.scss           # Estilos compartilhados
```

## 🎨 Paleta de Cores

- **Verde Escuro (Sidebar):** `#1D2B24`
- **Verde Médio (Ativo/Botões):** `#2D8659`
- **Texto Principal:** `#374151`
- **Borda:** `#D1D5DB`
- **Erro:** `#DC2626`
- **Background:** `#F9FAFB`

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd angular-wizard-fornecedor

# Instale as dependências
npm install
```

### Executar em desenvolvimento

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador. A aplicação irá recarregar automaticamente quando você modificar os arquivos.

## ⚙️ Build para Produção

```bash
ng build
```

Os arquivos de build estarão no diretório `dist/angular-wizard-fornecedor/`.

## 📋 Funcionalidades Implementadas

### Etapa 1 - Informações da Empresa
- ✅ Campos de identificação (Razão Social, Nome Fantasia, Categoria)
- ✅ Campos de endereço completo com máscara de CEP
- ✅ Campos de contato (Telefone, E-mail) com validação
- ✅ Dados jurídicos (CNPJ/CPF, Inscrições, Forma Societária)
- ✅ Validações em tempo real
- ✅ Máscaras automáticas (CEP, Telefone, CNPJ/CPF)

### Etapas 2-5
- ✅ Estrutura básica implementada
- ✅ Navegação entre etapas funcionando
- ✅ Botões Voltar/Avançar
- ✅ Persistência de dados entre etapas

### Sistema de Navegação
- ✅ Sidebar com indicador visual de progresso
- ✅ Marcação de etapas completadas
- ✅ Navegação clicável para etapas acessíveis
- ✅ Estado ativo destacado

### UX/Design
- ✅ Layout responsivo (3/2/1 colunas)
- ✅ Paleta de cores conforme especificação
- ✅ Animações e transições suaves
- ✅ Feedback visual para erros
- ✅ Estilos hover e focus

## 🔄 Próximos Passos (Melhorias Sugeridas)

1. **Integração com API ViaCEP** - Busca automática de endereço pelo CEP
2. **Validação avançada de CNPJ/CPF** - Verificação de dígitos verificadores
3. **Persistência em LocalStorage** - Salvar progresso localmente
4. **Modo de visualização** - Resumo final antes de enviar
5. **Upload de documentos** - Anexar documentos por etapa
6. **Testes unitários** - Cobertura de testes com Jasmine/Karma
7. **Internacionalização (i18n)** - Suporte multi-idioma
8. **Tema dark mode** - Alternância de tema claro/escuro

## 🧪 Testes

```bash
# Executar testes unitários
ng test

# Executar testes e2e
ng e2e
```

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Reactive Forms](https://angular.dev/guide/forms/reactive-forms)
- [Standalone Components](https://angular.dev/guide/components/importing)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e demonstração de UX em formulários Angular.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ usando Angular e TypeScript.

---

**Nota:** Este é um projeto frontend apenas. Para integração completa, será necessário conectar a um backend/API para persistência dos dados.
