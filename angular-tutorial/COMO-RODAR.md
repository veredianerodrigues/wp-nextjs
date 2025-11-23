# 🚀 Como Rodar o Projeto

## Opção 1: Criar Projeto Angular Completo (Recomendado)

### Passo 1: Instalar Angular CLI

```bash
npm install -g @angular/cli
```

### Passo 2: Criar novo projeto

```bash
ng new login-tutorial
```

Quando perguntado:
- **Would you like to add Angular routing?** → `No` (ou `Yes` se quiser)
- **Which stylesheet format?** → `CSS`

### Passo 3: Entrar no projeto

```bash
cd login-tutorial
```

### Passo 4: Copiar os arquivos do tutorial

Copie os arquivos deste tutorial para o projeto Angular:

```bash
# Copie os arquivos models
cp angular-tutorial/src/app/models/*.ts login-tutorial/src/app/models/

# Copie os arquivos services
cp angular-tutorial/src/app/services/*.ts login-tutorial/src/app/services/

# Copie os arquivos components
cp angular-tutorial/src/app/components/login/*.* login-tutorial/src/app/components/login/
```

### Passo 5: Configurar o módulo principal

Edite o arquivo `src/app/app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Para formulários reativos
    HttpClientModule      // Para requisições HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Passo 6: Adicionar componente no app.component.html

Edite `src/app/app.component.html` e substitua todo o conteúdo por:

```html
<app-login></app-login>
```

### Passo 7: Rodar o projeto

```bash
ng serve
```

Abra o navegador em: **http://localhost:4200**

---

## Opção 2: Criar Manualmente (Para Aprendizado)

Se você quer praticar criando tudo do zero:

### Passo 1: Criar projeto

```bash
ng new login-tutorial
cd login-tutorial
```

### Passo 2: Criar estrutura de pastas

```bash
mkdir -p src/app/models
mkdir -p src/app/services
mkdir -p src/app/components/login
```

### Passo 3: Criar Models

Crie o arquivo `src/app/models/user.model.ts` e copie o conteúdo do tutorial.

Crie o arquivo `src/app/models/auth-response.model.ts` e copie o conteúdo do tutorial.

### Passo 4: Criar Service

Crie o arquivo `src/app/services/auth.service.ts` e copie o conteúdo do tutorial.

### Passo 5: Criar Component

```bash
ng generate component components/login
```

Isso criará automaticamente:
- `login.component.ts`
- `login.component.html`
- `login.component.css`
- `login.component.spec.ts` (arquivo de teste)

Substitua o conteúdo desses arquivos pelos do tutorial.

### Passo 6: Configurar imports no AppModule

Edite `src/app/app.module.ts` conforme mostrado na Opção 1, Passo 5.

### Passo 7: Usar o componente

Edite `src/app/app.component.html`:

```html
<app-login></app-login>
```

### Passo 8: Rodar

```bash
ng serve
```

---

## Opção 3: Apenas Estudar o Código

Se você não quer rodar agora, pode simplesmente:

1. ✅ Ler os arquivos do tutorial
2. ✅ Estudar os comentários explicativos
3. ✅ Entender os conceitos de OOP
4. ✅ Praticar mais tarde

Os arquivos são educacionais e contêm todas as explicações necessárias.

---

## 📦 Dependências Necessárias

O projeto Angular precisa destes pacotes (já incluídos em projetos criados pelo CLI):

```json
{
  "dependencies": {
    "@angular/common": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",      // Para formulários reativos
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/common/http": "^17.0.0", // Para requisições HTTP
    "rxjs": "^7.8.0",                  // Para Observables
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  }
}
```

---

## 🧪 Como Testar

### 1. Testar Login com Sucesso

Use um dos emails válidos da API JSONPlaceholder:

- **Email:** `Sincere@april.biz`
- **Senha:** Qualquer texto com 4+ caracteres (ex: `1234`)

### 2. Testar Validações

Tente submeter o formulário:
- ❌ Sem preencher campos → Veja mensagens de erro
- ❌ Com email inválido → Veja validação de email
- ❌ Com senha < 4 caracteres → Veja validação de senha

### 3. Testar Logout

Após fazer login, clique em "Sair" e veja que volta ao formulário.

### 4. Verificar Console

Abra o DevTools (F12) e veja os logs educacionais:
- 🔧 Quando services são instanciados
- 🎨 Quando components são criados
- 📡 Quando requisições são feitas
- ✅ Quando login é bem-sucedido

---

## 🔍 Troubleshooting (Resolução de Problemas)

### Erro: "Cannot find module '@angular/forms'"

**Solução:** Certifique-se de importar `ReactiveFormsModule` no `app.module.ts`:

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})
```

### Erro: "Cannot find module '@angular/common/http'"

**Solução:** Certifique-se de importar `HttpClientModule` no `app.module.ts`:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
```

### Erro: "NullInjectorError: No provider for HttpClient"

**Solução:** Adicione `HttpClientModule` aos imports do módulo.

### Erro de CORS ao fazer requisição

**Solução:** A API JSONPlaceholder permite CORS. Se ainda assim tiver problemas:
1. Verifique sua conexão com internet
2. Teste a API diretamente: https://jsonplaceholder.typicode.com/users

### Componente não aparece

**Solução:** Verifique se:
1. Declarou o componente em `declarations` do módulo
2. Usou o selector correto no HTML: `<app-login></app-login>`
3. Não há erros no console

---

## 📚 Comandos Úteis do Angular CLI

```bash
# Criar novo projeto
ng new nome-do-projeto

# Rodar servidor de desenvolvimento
ng serve

# Rodar em porta específica
ng serve --port 4300

# Criar component
ng generate component nome-do-component
ng g c nome-do-component  # versão curta

# Criar service
ng generate service nome-do-service
ng g s nome-do-service  # versão curta

# Criar interface
ng generate interface nome-da-interface
ng g i nome-da-interface  # versão curta

# Build para produção
ng build --configuration production

# Rodar testes
ng test

# Ver documentação de comandos
ng help
```

---

## 🎯 Próximos Passos

Após rodar o projeto:

1. ✅ Teste todas as funcionalidades
2. ✅ Abra o DevTools e veja os logs
3. ✅ Modifique o código e veja o que acontece
4. ✅ Adicione novas funcionalidades:
   - Campo "Lembrar de mim"
   - Recuperação de senha
   - Registro de novo usuário
   - Perfil do usuário
5. ✅ Estude a documentação oficial: https://angular.io/

**Bom aprendizado! 🚀**
