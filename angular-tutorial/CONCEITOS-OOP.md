# 🎯 Conceitos de Orientação a Objetos no Angular

## Índice
1. [Classes](#classes)
2. [Interfaces](#interfaces)
3. [Encapsulamento](#encapsulamento)
4. [Injeção de Dependências](#injecao-de-dependencias)
5. [Abstração](#abstracao)
6. [Herança](#heranca)
7. [Polimorfismo](#polimorfismo)

---

## 1. Classes {#classes}

### O que são?
Classes são "moldes" ou "blueprints" para criar objetos. Elas definem propriedades (dados) e métodos (comportamentos).

### Exemplo no Projeto:

```typescript
// arquivo: user.model.ts
export class User {
  // Propriedades
  public id: number;
  public name: string;
  public email: string;

  // Constructor
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // Métodos
  public getFullInfo(): string {
    return `${this.name} - ${this.email}`;
  }
}
```

### Como usar:
```typescript
// Criando uma instância (objeto) da classe
const usuario = new User(1, "João Silva", "joao@email.com");

// Acessando propriedades
console.log(usuario.name); // "João Silva"

// Chamando métodos
console.log(usuario.getFullInfo()); // "João Silva - joao@email.com"
```

### Benefícios:
✅ Organiza código relacionado
✅ Reutilização de código
✅ Facilita manutenção
✅ Encapsula lógica

---

## 2. Interfaces {#interfaces}

### O que são?
Interfaces definem "contratos" - especificam quais propriedades um objeto deve ter, mas não implementam lógica.

### Exemplo no Projeto:

```typescript
// arquivo: user.model.ts
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string; // opcional
}
```

### Como usar:
```typescript
// Garantindo que um objeto tenha a estrutura correta
const usuario: IUser = {
  id: 1,
  name: "João Silva",
  username: "joao123",
  email: "joao@email.com"
  // phone é opcional, pode omitir
};

// ❌ ERRO: TypeScript vai reclamar!
const usuarioInvalido: IUser = {
  id: 1,
  name: "Maria"
  // Faltam username e email
};
```

### Diferença: Interface vs Classe

| Característica | Interface | Classe |
|---------------|-----------|--------|
| Tem lógica/métodos? | ❌ Não | ✅ Sim |
| Pode ser instanciada? | ❌ Não | ✅ Sim |
| Define estrutura? | ✅ Sim | ✅ Sim |
| Verificada em tempo de compilação? | ✅ Sim | ✅ Sim |
| Existe em runtime? | ❌ Não | ✅ Sim |

### Quando usar cada uma?

**Use Interface quando:**
- Só precisa definir a forma dos dados
- Está tipando resposta de API
- Quer garantir type safety

**Use Classe quando:**
- Precisa de métodos com lógica
- Precisa de constructor customizado
- Quer encapsular comportamento

---

## 3. Encapsulamento {#encapsulamento}

### O que é?
Encapsulamento é o ato de "esconder" detalhes internos e expor apenas o necessário através de uma interface pública.

### Modificadores de Acesso:

```typescript
class ContaBancaria {
  // PUBLIC: Acessível de qualquer lugar (padrão)
  public titular: string;

  // PRIVATE: Só acessível dentro desta classe
  private saldo: number = 0;

  // PROTECTED: Acessível nesta classe e classes filhas
  protected historico: string[] = [];

  constructor(titular: string) {
    this.titular = titular;
  }

  // Método público que controla acesso ao saldo privado
  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
      this.registrarHistorico(`Depósito: R$ ${valor}`);
    }
  }

  public getSaldo(): number {
    return this.saldo;
  }

  private registrarHistorico(acao: string): void {
    this.historico.push(acao);
  }
}
```

### Exemplo no Projeto:

```typescript
// arquivo: auth.service.ts
export class AuthService {
  // Propriedade privada - só AuthService pode acessar
  private currentUser: IUser | null = null;

  // Método público - qualquer componente pode chamar
  public login(credentials: ILoginCredentials): Observable<AuthResponse> {
    // ...lógica de login
  }

  // Método privado - só usado internamente
  private generateToken(userId: number): string {
    return `token_${userId}_${Date.now()}`;
  }
}
```

### Benefícios:
✅ Protege dados sensíveis
✅ Controla como dados são acessados/modificados
✅ Facilita manutenção (altera internals sem quebrar código externo)
✅ Reduz bugs (menos acesso direto a dados)

---

## 4. Injeção de Dependências {#injecao-de-dependencias}

### O que é?
Padrão onde dependências são **fornecidas** (injetadas) ao invés de serem **criadas** dentro da classe.

### Sem Injeção de Dependências (❌ Ruim):

```typescript
class LoginComponent {
  private authService: AuthService;

  constructor() {
    // Componente cria sua própria dependência
    this.authService = new AuthService();
  }
}

// Problemas:
// - Difícil de testar (não pode injetar mock)
// - Fortemente acoplado
// - Não pode reutilizar instância
```

### Com Injeção de Dependências (✅ Bom):

```typescript
@Component({...})
export class LoginComponent {
  // Angular injeta automaticamente
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(...);
  }
}

// Benefícios:
// ✅ Fácil testar (injeta mock)
// ✅ Desacoplado
// ✅ Angular gerencia instâncias
```

### Como Angular Faz a Mágica?

1. **Você marca o service com `@Injectable`:**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService { }
```

2. **Angular registra no Injector (contenedor de dependências)**

3. **Você declara no constructor do component:**
```typescript
constructor(private authService: AuthService) {}
```

4. **Angular vê que LoginComponent precisa de AuthService**

5. **Angular busca/cria instância e injeta automaticamente**

### Benefícios:
✅ **Testabilidade** - Injeta mocks em testes
✅ **Desacoplamento** - Componentes não conhecem implementação
✅ **Singleton** - Uma instância para toda app (com `providedIn: 'root'`)
✅ **Manutenibilidade** - Troca implementação sem mudar componentes

---

## 5. Abstração {#abstracao}

### O que é?
Abstração é esconder complexidade mostrando apenas o essencial. No Angular, separamos responsabilidades em camadas.

### Arquitetura em Camadas:

```
┌─────────────────────────────────────┐
│         COMPONENTS                  │  ← Interface do usuário
│  (Apresentação e interação)         │
└─────────────┬───────────────────────┘
              │ usa
              ↓
┌─────────────────────────────────────┐
│          SERVICES                   │  ← Lógica de negócio
│  (Comunicação com API)              │
└─────────────┬───────────────────────┘
              │ usa
              ↓
┌─────────────────────────────────────┐
│          MODELS                     │  ← Estrutura de dados
│  (Classes e Interfaces)             │
└─────────────────────────────────────┘
```

### Exemplo no Projeto:

#### Model (Estrutura de Dados):
```typescript
// user.model.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
}
```

#### Service (Lógica de Negócio):
```typescript
// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: ILoginCredentials): Observable<AuthResponse> {
    return this.http.get<IUser[]>(`${API_URL}/users`).pipe(
      map(users => this.findAndValidateUser(users, credentials))
    );
  }
}
```

#### Component (Interface):
```typescript
// login.component.ts
@Component({...})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      response => this.handleResponse(response)
    );
  }
}
```

### Benefícios da Separação:
✅ **Reusabilidade** - AuthService pode ser usado por vários componentes
✅ **Testabilidade** - Testa cada camada independentemente
✅ **Manutenibilidade** - Mudanças em uma camada não afetam outras
✅ **Clareza** - Cada arquivo tem responsabilidade única

---

## 6. Herança {#heranca}

### O que é?
Herança permite criar classes baseadas em outras, reutilizando código.

### Exemplo:

```typescript
// Classe base (pai)
class Animal {
  constructor(public nome: string) {}

  public fazerSom(): string {
    return "Som genérico";
  }
}

// Classe derivada (filho)
class Cachorro extends Animal {
  public fazerSom(): string {
    return "Au au!";
  }

  public abanarRabo(): void {
    console.log(`${this.nome} está abanando o rabo`);
  }
}

// Uso
const dog = new Cachorro("Rex");
console.log(dog.nome);          // "Rex" (herdado de Animal)
console.log(dog.fazerSom());    // "Au au!" (sobrescrito)
dog.abanarRabo();               // método próprio
```

### No Angular:

```typescript
// Base component
export class BaseComponent {
  protected isLoading = false;

  protected showLoader(): void {
    this.isLoading = true;
  }

  protected hideLoader(): void {
    this.isLoading = false;
  }
}

// Component que herda
@Component({...})
export class LoginComponent extends BaseComponent {
  login(): void {
    this.showLoader(); // método herdado
    // ...lógica de login
    this.hideLoader();
  }
}
```

---

## 7. Polimorfismo {#polimorfismo}

### O que é?
Polimorfismo permite tratar objetos de classes diferentes através da mesma interface.

### Exemplo:

```typescript
interface IPaymentMethod {
  processPayment(amount: number): void;
}

class CreditCard implements IPaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processando R$ ${amount} no cartão de crédito`);
  }
}

class PayPal implements IPaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processando R$ ${amount} via PayPal`);
  }
}

class Pix implements IPaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processando R$ ${amount} via Pix`);
  }
}

// Uso polimórfico
function processOrder(paymentMethod: IPaymentMethod, amount: number) {
  paymentMethod.processPayment(amount);
}

// Todos implementam mesma interface, mas comportamento diferente
processOrder(new CreditCard(), 100); // Cartão de crédito
processOrder(new PayPal(), 200);     // PayPal
processOrder(new Pix(), 50);         // Pix
```

---

## 📚 Resumo Geral

| Conceito | Descrição | Benefício Principal |
|----------|-----------|---------------------|
| **Classes** | Moldes para criar objetos | Organização e reutilização |
| **Interfaces** | Contratos de tipos | Type safety |
| **Encapsulamento** | Esconde detalhes internos | Segurança e controle |
| **Injeção de Dependências** | Fornece dependências externamente | Testabilidade |
| **Abstração** | Esconde complexidade | Simplicidade |
| **Herança** | Reutiliza código de classes pai | Reaproveitamento |
| **Polimorfismo** | Múltiplas formas através de interface comum | Flexibilidade |

---

## 🎯 Como Tudo se Conecta no Angular

```
1. MODELS definem estrutura de dados (Classes/Interfaces)
   ↓
2. SERVICES contêm lógica de negócio (Classes com DI)
   ↓
3. COMPONENTS usam Services (DI) para apresentar dados
   ↓
4. TEMPLATES exibem dados e capturam eventos
   ↓
5. Tudo junto forma uma aplicação organizada e manutenível
```

---

## 💡 Próximos Passos

Agora que você entende OOP no Angular:

1. ✅ Estude o código do tutorial linha por linha
2. ✅ Modifique o código e veja o que acontece
3. ✅ Crie seus próprios Models, Services e Components
4. ✅ Pratique com projetos pessoais

**Continue aprendendo! 🚀**
