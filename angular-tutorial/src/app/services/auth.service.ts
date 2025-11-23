/**
 * ========================================
 * 📚 AULA 3: SERVICES E INJEÇÃO DE DEPENDÊNCIAS
 * ========================================
 *
 * Nesta aula você vai aprender:
 * 1. O que são Services no Angular
 * 2. Como funciona Injeção de Dependências (DI)
 * 3. Como comunicar com APIs REST
 * 4. Observables e programação reativa
 * 5. Tratamento de erros
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

import { IUser, User } from '../models/user.model';
import { ILoginCredentials, AuthResponse } from '../models/auth-response.model';

/**
 * ========================================
 * 💡 CONCEITO OOP: DECORATOR @Injectable
 * ========================================
 *
 * O decorator @Injectable() marca esta classe como um serviço
 * que pode ser INJETADO em outros componentes/serviços.
 *
 * providedIn: 'root' significa que este serviço é um SINGLETON
 * (apenas UMA instância para toda a aplicação)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ==========================================
  // PROPRIEDADES PRIVADAS
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Encapsulamento
   *
   * Propriedades privadas só são acessíveis dentro desta classe.
   * Isso protege dados sensíveis e controla como são acessados.
   */

  private readonly API_URL = 'https://jsonplaceholder.typicode.com';
  private currentUser: IUser | null = null;
  private authToken: string | null = null;

  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIAS
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Dependency Injection (DI)
   *
   * O Angular INJETA automaticamente o HttpClient no constructor.
   * Você não precisa fazer: this.http = new HttpClient()
   *
   * Benefícios da DI:
   * 1. Desacoplamento - A classe não precisa saber como criar suas dependências
   * 2. Testabilidade - Podemos injetar mocks nos testes
   * 3. Reutilização - Angular gerencia as instâncias
   *
   * IMPORTANTE: O modificador 'private' no constructor cria
   * automaticamente uma propriedade privada 'http'
   */
  constructor(private http: HttpClient) {
    console.log('🔧 AuthService foi instanciado pelo Angular!');
    // Angular cria e injeta HttpClient automaticamente
  }

  // ==========================================
  // MÉTODOS PÚBLICOS (API do Service)
  // ==========================================

  /**
   * ========================================
   * 💡 CONCEITO: OBSERVABLES
   * ========================================
   *
   * Observables são streams (fluxos) de dados assíncronos.
   * São como Promises, mas mais poderosos:
   *
   * - Podem emitir múltiplos valores ao longo do tempo
   * - Podem ser cancelados
   * - Oferecem operadores poderosos (map, filter, etc)
   *
   * O HttpClient do Angular retorna Observables automaticamente.
   */

  /**
   * Realiza login do usuário
   *
   * @param credentials - Email e senha do usuário
   * @returns Observable com a resposta de autenticação
   */
  public login(credentials: ILoginCredentials): Observable<AuthResponse> {
    console.log('🔐 Tentando fazer login com:', credentials.email);

    /**
     * NOTA EDUCACIONAL:
     * JSONPlaceholder não tem endpoint de login real.
     * Vamos simular:
     * 1. Buscar usuário por email
     * 2. Validar credenciais (simulado)
     * 3. Retornar token (simulado)
     */

    return this.http
      .get<IUser[]>(`${this.API_URL}/users`)
      .pipe(
        /**
         * 💡 OPERADOR: map()
         * Transforma os dados recebidos
         */
        map((users: IUser[]) => {
          console.log('📡 Recebeu', users.length, 'usuários da API');

          // Procura usuário com o email informado
          const foundUser = users.find(
            (user) => user.email.toLowerCase() === credentials.email.toLowerCase()
          );

          if (!foundUser) {
            // Usuário não encontrado
            return AuthResponse.error('Email não encontrado');
          }

          // SIMULAÇÃO: Validar senha
          // Em produção, isso seria feito no backend!
          if (credentials.password.length < 4) {
            return AuthResponse.error('Senha inválida');
          }

          // Login bem-sucedido!
          // Gera token simulado
          const token = this.generateToken(foundUser.id);

          // Salva dados do usuário autenticado
          this.currentUser = foundUser;
          this.authToken = token;

          // Salva no localStorage (persiste entre reloads)
          this.saveToLocalStorage(foundUser, token);

          console.log('✅ Login bem-sucedido!', foundUser.name);

          return AuthResponse.success(foundUser, token);
        }),

        /**
         * 💡 OPERADOR: catchError()
         * Captura e trata erros
         */
        catchError((error: HttpErrorResponse) => {
          console.error('❌ Erro na requisição:', error);

          // Retorna um Observable com erro tratado
          return of(
            AuthResponse.error('Erro ao conectar com o servidor. Tente novamente.')
          );
        }),

        /**
         * 💡 OPERADOR: delay()
         * Adiciona delay para simular latência de rede
         * (apenas para fins educacionais)
         */
        delay(1000)
      );
  }

  /**
   * Realiza logout do usuário
   */
  public logout(): void {
    console.log('👋 Fazendo logout...');

    this.currentUser = null;
    this.authToken = null;

    // Remove do localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');

    console.log('✅ Logout realizado');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public isAuthenticated(): boolean {
    return this.authToken !== null && this.currentUser !== null;
  }

  /**
   * Retorna o usuário atual
   *
   * 💡 CONCEITO OOP: Getter
   * Método que age como uma propriedade
   */
  public getCurrentUser(): IUser | null {
    return this.currentUser;
  }

  /**
   * Retorna o token de autenticação
   */
  public getToken(): string | null {
    return this.authToken;
  }

  /**
   * Tenta restaurar sessão do localStorage
   * (útil quando o usuário recarrega a página)
   */
  public restoreSession(): boolean {
    const userStr = localStorage.getItem('currentUser');
    const token = localStorage.getItem('authToken');

    if (userStr && token) {
      this.currentUser = JSON.parse(userStr);
      this.authToken = token;
      console.log('🔄 Sessão restaurada:', this.currentUser?.name);
      return true;
    }

    return false;
  }

  // ==========================================
  // MÉTODOS PRIVADOS (Lógica Interna)
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Encapsulamento
   *
   * Métodos privados são detalhes de implementação.
   * Componentes que usam este service não precisam saber
   * como o token é gerado ou como os dados são salvos.
   */

  /**
   * Gera um token de autenticação simulado
   */
  private generateToken(userId: number): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return `token_${userId}_${timestamp}_${random}`;
  }

  /**
   * Salva dados no localStorage
   */
  private saveToLocalStorage(user: IUser, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
  }

  // ==========================================
  // MÉTODO BÔNUS: Buscar Usuário por ID
  // ==========================================
  /**
   * Busca um usuário específico por ID
   * Demonstra requisição GET simples
   */
  public getUserById(id: number): Observable<User> {
    return this.http
      .get<IUser>(`${this.API_URL}/users/${id}`)
      .pipe(
        map((userData: IUser) => {
          // Converte dados JSON em instância da classe User
          return User.fromJSON(userData);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao buscar usuário:', error);
          return throwError(() => new Error('Usuário não encontrado'));
        })
      );
  }
}

/**
 * ========================================
 * 🎯 RESUMO: Services e DI
 * ========================================
 *
 * SERVICES SÃO USADOS PARA:
 * ✅ Lógica de negócio
 * ✅ Comunicação com APIs
 * ✅ Compartilhar dados entre componentes
 * ✅ Manipular estado da aplicação
 *
 * INJEÇÃO DE DEPENDÊNCIAS (DI):
 * ✅ Angular cria e gerencia instâncias
 * ✅ Você só declara o que precisa no constructor
 * ✅ Facilita testes (pode injetar mocks)
 * ✅ Reduz acoplamento
 *
 * ========================================
 * 💡 EXEMPLO DE USO NO COMPONENTE
 * ========================================
 *
 * @Component({...})
 * export class LoginComponent {
 *   // Angular injeta automaticamente
 *   constructor(private authService: AuthService) {}
 *
 *   fazerLogin() {
 *     const credentials = {
 *       email: 'Sincere@april.biz',
 *       password: '12345'
 *     };
 *
 *     this.authService.login(credentials).subscribe(
 *       (response: AuthResponse) => {
 *         if (response.success) {
 *           console.log('Login OK!', response.user);
 *         } else {
 *           console.log('Erro:', response.message);
 *         }
 *       }
 *     );
 *   }
 * }
 */
