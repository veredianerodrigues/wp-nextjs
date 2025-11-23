# 💪 Exercícios Práticos - Angular OOP

## 📚 Como Usar Este Guia

Cada exercício aumenta progressivamente em dificuldade. Tente fazer sozinho primeiro, depois veja a solução sugerida.

---

## Exercício 1: Adicionar Campo "Lembrar-me" (Básico)

### 🎯 Objetivo
Adicionar um checkbox "Lembrar-me" no formulário de login que salva a preferência do usuário.

### 📝 Tarefas

1. Adicionar novo campo ao formulário reativo
2. Adicionar checkbox no HTML
3. Usar o valor no localStorage

### 💡 Dicas

- Use `FormBuilder` para adicionar o campo
- Tipo do campo: `boolean`
- Valor padrão: `false`

### ✅ Solução Sugerida

```typescript
// login.component.ts
private createForm(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [false]  // Novo campo
  });
}

public onSubmit(): void {
  // ...código de login existente

  const rememberMe = this.loginForm.value.rememberMe;

  if (rememberMe) {
    // Salvar email para próxima vez
    localStorage.setItem('savedEmail', credentials.email);
  } else {
    localStorage.removeItem('savedEmail');
  }
}

ngOnInit(): void {
  this.createForm();

  // Recuperar email salvo
  const savedEmail = localStorage.getItem('savedEmail');
  if (savedEmail) {
    this.loginForm.patchValue({
      email: savedEmail,
      rememberMe: true
    });
  }
}
```

```html
<!-- login.component.html -->
<div class="form-group">
  <label>
    <input type="checkbox" formControlName="rememberMe" />
    Lembrar meu email
  </label>
</div>
```

---

## Exercício 2: Adicionar Validação Customizada (Intermediário)

### 🎯 Objetivo
Criar um validador customizado que só aceita emails de domínios específicos (ex: @gmail.com ou @hotmail.com).

### 📝 Tarefas

1. Criar função validadora customizada
2. Aplicar ao campo email
3. Mostrar mensagem de erro específica

### 💡 Dicas

- Validadores retornam `null` se válido ou um objeto de erro
- Use `ValidatorFn` do Angular
- Acesse o valor do campo com `control.value`

### ✅ Solução Sugerida

```typescript
// login.component.ts

import { AbstractControl, ValidatorFn } from '@angular/forms';

// Função validadora customizada
function allowedDomainsValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Deixa o Validators.required cuidar disso
    }

    const email = control.value as string;
    const domain = email.split('@')[1];

    if (domain && allowedDomains.includes(domain)) {
      return null; // Válido
    }

    return {
      'invalidDomain': {
        value: control.value,
        allowedDomains: allowedDomains
      }
    };
  };
}

// No createForm()
private createForm(): void {
  this.loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        allowedDomainsValidator(['gmail.com', 'hotmail.com', 'april.biz'])
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
}
```

```html
<!-- login.component.html -->
<div *ngIf="email.invalid && email.touched" class="error-message">
  <small *ngIf="email.errors?.['required']">
    ⚠️ Email é obrigatório
  </small>
  <small *ngIf="email.errors?.['email']">
    ⚠️ Digite um email válido
  </small>
  <small *ngIf="email.errors?.['invalidDomain']">
    ⚠️ Apenas emails @gmail.com, @hotmail.com ou @april.biz são aceitos
  </small>
</div>
```

---

## Exercício 3: Criar Service de Notificação (Intermediário)

### 🎯 Objetivo
Criar um service que exibe notificações toast (mensagens temporárias) na tela.

### 📝 Tarefas

1. Criar `NotificationService`
2. Implementar métodos `success()`, `error()`, `info()`
3. Usar no `LoginComponent`

### 💡 Dicas

- Use `@Injectable({ providedIn: 'root' })`
- Use `Subject` do RxJS para comunicação
- Injete no LoginComponent

### ✅ Solução Sugerida

```typescript
// notification.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  public notifications$: Observable<Notification> = this.notificationSubject.asObservable();

  public success(message: string): void {
    this.notificationSubject.next({ type: 'success', message });
  }

  public error(message: string): void {
    this.notificationSubject.next({ type: 'error', message });
  }

  public info(message: string): void {
    this.notificationSubject.next({ type: 'info', message });
  }
}
```

```typescript
// login.component.ts

import { NotificationService } from '../../services/notification.service';

export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService  // Injetar
  ) {}

  public onSubmit(): void {
    // ...código existente

    this.authService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        if (response.success) {
          this.notificationService.success('Login realizado com sucesso!');
        } else {
          this.notificationService.error(response.message);
        }
      },
      error: () => {
        this.notificationService.error('Erro ao fazer login');
      }
    });
  }
}
```

---

## Exercício 4: Adicionar Guard de Autenticação (Avançado)

### 🎯 Objetivo
Criar um `AuthGuard` que protege rotas que precisam de autenticação.

### 📝 Tarefas

1. Criar `AuthGuard`
2. Verificar se usuário está autenticado
3. Redirecionar para login se não estiver

### 💡 Dicas

- Use `ng generate guard auth`
- Implemente interface `CanActivate`
- Use o `AuthService` para verificar autenticação

### ✅ Solução Sugerida

```typescript
// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Pode acessar a rota
    }

    // Não está autenticado, redireciona para login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
```

```typescript
// app-routing.module.ts

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]  // Rota protegida
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]  // Rota protegida
  }
];
```

---

## Exercício 5: Implementar Método de Registro (Avançado)

### 🎯 Objetivo
Adicionar funcionalidade de registro de novos usuários.

### 📝 Tarefas

1. Criar interface `IRegisterData`
2. Adicionar método `register()` ao `AuthService`
3. Criar `RegisterComponent`
4. Validar senha (confirmação de senha)

### 💡 Dicas

- Use validação customizada para comparar senhas
- Simule POST para API (JSONPlaceholder aceita POSTs falsos)
- Reutilize estilos do LoginComponent

### ✅ Solução Sugerida

```typescript
// auth.service.ts

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

public register(data: IRegisterData): Observable<AuthResponse> {
  // Simulação: JSONPlaceholder aceita POST mas não salva realmente
  return this.http.post<IUser>(`${this.API_URL}/users`, {
    name: data.name,
    email: data.email,
    username: data.email.split('@')[0]
  }).pipe(
    map((user: IUser) => {
      const token = this.generateToken(user.id);
      this.currentUser = user;
      this.authToken = token;
      return AuthResponse.success(user, token);
    }),
    catchError(() => {
      return of(AuthResponse.error('Erro ao registrar usuário'));
    })
  );
}
```

```typescript
// register.component.ts

export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator  // Validador customizado
    });
  }

  // Validador que compara password e confirmPassword
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register({ name, email, password }).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }
}
```

---

## Exercício 6: Criar Interceptor HTTP (Avançado)

### 🎯 Objetivo
Criar um interceptor que adiciona o token de autenticação automaticamente em todas as requisições.

### 📝 Tarefas

1. Criar `AuthInterceptor`
2. Adicionar header `Authorization` com token
3. Registrar no módulo

### ✅ Solução Sugerida

```typescript
// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();

    if (token) {
      // Clona a requisição e adiciona o header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
```

```typescript
// app.module.ts

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

---

## 🎯 Desafio Final: Aplicação Completa

### Criar uma aplicação de gerenciamento de tarefas (Todo App) que inclua:

1. ✅ Login/Registro com autenticação
2. ✅ Lista de tarefas (GET, POST, PUT, DELETE)
3. ✅ Filtros (todas, pendentes, concluídas)
4. ✅ Paginação
5. ✅ Guards para proteger rotas
6. ✅ Interceptors para adicionar token
7. ✅ Services para cada recurso
8. ✅ Models bem definidos
9. ✅ Validações customizadas
10. ✅ Notificações toast

### API Sugerida

Use JSONPlaceholder:
- Usuários: `/users`
- Tarefas: `/todos`
- Posts: `/posts`

---

## 📚 Recursos Adicionais

### Documentação Oficial
- Angular: https://angular.io/
- RxJS: https://rxjs.dev/
- TypeScript: https://www.typescriptlang.org/

### Tutoriais
- Tour of Heroes (oficial): https://angular.io/tutorial
- RxJS em 60 minutos: https://www.youtube.com/watch?v=Tux1nhBPl_w

### APIs Públicas para Praticar
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
- ReqRes: https://reqres.in/
- The Cat API: https://thecatapi.com/

---

## 🎓 Checklist de Aprendizado

Marque conforme for completando:

### Conceitos OOP
- [ ] Entendo o que são Classes
- [ ] Entendo o que são Interfaces
- [ ] Sei a diferença entre Classes e Interfaces
- [ ] Entendo Encapsulamento (public/private)
- [ ] Entendo Injeção de Dependências
- [ ] Entendo Abstração e separação de camadas

### Angular
- [ ] Sei criar Components
- [ ] Sei criar Services
- [ ] Sei criar Models (Classes/Interfaces)
- [ ] Entendo formulários reativos
- [ ] Sei fazer requisições HTTP
- [ ] Entendo Observables básicos
- [ ] Sei usar Lifecycle Hooks
- [ ] Sei criar validações customizadas

### Prática
- [ ] Completei Exercício 1
- [ ] Completei Exercício 2
- [ ] Completei Exercício 3
- [ ] Completei Exercício 4
- [ ] Completei Exercício 5
- [ ] Completei Exercício 6
- [ ] Comecei o Desafio Final

---

**Continue praticando! A prática leva à perfeição! 🚀**
