# 🎓 Tutorial: Orientação a Objetos no Angular

## Bem-vindo ao seu primeiro projeto Angular com OOP!

Este tutorial vai ensinar os conceitos de **Programação Orientada a Objetos** aplicados ao Angular através de um projeto prático: **Sistema de Login**.

---

## 📖 Índice

1. [Conceitos de OOP no Angular](#conceitos)
2. [Estrutura do Projeto](#estrutura)
3. [Passo a Passo](#passo-a-passo)
4. [Como Executar](#como-executar)

---

## 🎯 Conceitos de OOP no Angular {#conceitos}

### 1. **Classes (Classes)**
Classes são blueprints (moldes) que definem propriedades e métodos de objetos.

```typescript
// Exemplo de classe
class Usuario {
  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  exibirInfo() {
    console.log(`${this.nome} - ${this.email}`);
  }
}
```

### 2. **Interfaces (Interfaces)**
Interfaces definem contratos de tipos, garantindo que objetos tenham a estrutura esperada.

```typescript
interface IUsuario {
  id: number;
  nome: string;
  email: string;
}
```

### 3. **Encapsulamento (Encapsulation)**
Controle de acesso a propriedades e métodos usando `public`, `private`, `protected`.

```typescript
class ContaBancaria {
  private saldo: number = 0;  // Só acessível dentro da classe

  public depositar(valor: number) {  // Acessível de qualquer lugar
    this.saldo += valor;
  }

  public getSaldo(): number {
    return this.saldo;
  }
}
```

### 4. **Injeção de Dependências (Dependency Injection)**
Padrão onde dependências são fornecidas ao invés de serem criadas dentro da classe.

```typescript
@Component({...})
export class LoginComponent {
  // Angular injeta automaticamente o AuthService
  constructor(private authService: AuthService) {}
}
```

### 5. **Abstração (Abstraction)**
Separação de responsabilidades em camadas:
- **Models**: Definem estrutura de dados
- **Services**: Lógica de negócio e comunicação com API
- **Components**: Interface do usuário

---

## 📁 Estrutura do Projeto {#estrutura}

```
angular-tutorial/
├── src/
│   └── app/
│       ├── models/           # 📦 Classes e Interfaces
│       │   ├── user.model.ts
│       │   └── auth-response.model.ts
│       ├── services/         # 🔧 Lógica de negócio
│       │   └── auth.service.ts
│       └── components/       # 🎨 Interface do usuário
│           └── login/
│               ├── login.component.ts
│               ├── login.component.html
│               └── login.component.css
└── README.md
```

---

## 🚀 Passo a Passo {#passo-a-passo}

### **ETAPA 1: Models (Modelos de Dados)**
Vamos criar classes e interfaces que representam nossos dados.

📄 Arquivo: `src/app/models/user.model.ts`

### **ETAPA 2: Services (Serviços)**
Criamos serviços que contêm a lógica de negócio e comunicação com APIs.

📄 Arquivo: `src/app/services/auth.service.ts`

### **ETAPA 3: Components (Componentes)**
Criamos componentes que representam a interface visual.

📄 Arquivos:
- `src/app/components/login/login.component.ts`
- `src/app/components/login/login.component.html`
- `src/app/components/login/login.component.css`

---

## ⚡ Como Executar {#como-executar}

### Opção 1: Criar projeto Angular completo
```bash
# Instalar Angular CLI
npm install -g @angular/cli

# Criar novo projeto
ng new login-app

# Copiar os arquivos deste tutorial para o projeto
# Executar
cd login-app
ng serve
```

### Opção 2: Estudar o código
Os arquivos neste tutorial são educacionais e contêm:
- ✅ Comentários explicativos
- ✅ Exemplos de OOP
- ✅ Boas práticas do Angular

---

## 🎯 API Utilizada

**JSONPlaceholder** - API REST gratuita para testes
- URL: https://jsonplaceholder.typicode.com/
- Endpoint de usuários: `/users`

Exemplo de resposta:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}
```

---

## 📚 Próximos Passos

Após concluir este tutorial, você terá aprendido:
- ✅ Como criar classes e interfaces no TypeScript
- ✅ Como implementar services com injeção de dependências
- ✅ Como criar componentes reativos no Angular
- ✅ Como integrar com APIs REST
- ✅ Princípios de OOP aplicados ao Angular

**Continue praticando! 🚀**
