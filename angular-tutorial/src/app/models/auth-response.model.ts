/**
 * ========================================
 * 📚 AULA 2: MODELS PARA AUTENTICAÇÃO
 * ========================================
 *
 * Aqui criamos modelos específicos para o processo de login.
 */

import { IUser } from './user.model';

/**
 * Interface para as credenciais de login
 * (dados que o usuário digita no formulário)
 */
export interface ILoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface para a resposta da API de autenticação
 *
 * 💡 CONCEITO OOP: Composição
 * Esta interface "compõe" (usa) a interface IUser
 */
export interface IAuthResponse {
  success: boolean;      // Login foi bem-sucedido?
  message: string;       // Mensagem de retorno
  user?: IUser;          // Dados do usuário (opcional - só se success = true)
  token?: string;        // Token de autenticação (simulado)
}

/**
 * Classe que representa uma resposta de autenticação
 *
 * 💡 CONCEITO OOP: Classe com Lógica de Validação
 */
export class AuthResponse implements IAuthResponse {
  public success: boolean;
  public message: string;
  public user?: IUser;
  public token?: string;

  constructor(
    success: boolean,
    message: string,
    user?: IUser,
    token?: string
  ) {
    this.success = success;
    this.message = message;
    this.user = user;
    this.token = token;
  }

  /**
   * Verifica se a autenticação foi bem-sucedida
   */
  public isAuthenticated(): boolean {
    return this.success && this.user !== undefined && this.token !== undefined;
  }

  /**
   * Retorna mensagem formatada
   */
  public getFormattedMessage(): string {
    const emoji = this.success ? '✅' : '❌';
    return `${emoji} ${this.message}`;
  }

  /**
   * 💡 CONCEITO OOP: Factory Method (Método de Fábrica)
   *
   * Métodos estáticos que facilitam a criação de objetos
   * em situações específicas.
   */

  /**
   * Cria uma resposta de sucesso
   */
  static success(user: IUser, token: string): AuthResponse {
    return new AuthResponse(
      true,
      'Login realizado com sucesso!',
      user,
      token
    );
  }

  /**
   * Cria uma resposta de erro
   */
  static error(message: string): AuthResponse {
    return new AuthResponse(
      false,
      message
    );
  }
}

/**
 * ========================================
 * 🎯 EXEMPLO DE USO
 * ========================================
 *
 * // Resposta de sucesso
 * const successResponse = AuthResponse.success(
 *   { id: 1, name: "João", email: "joao@email.com" },
 *   "abc123token"
 * );
 *
 * console.log(successResponse.isAuthenticated()); // true
 * console.log(successResponse.getFormattedMessage()); // ✅ Login realizado com sucesso!
 *
 * // Resposta de erro
 * const errorResponse = AuthResponse.error('Email ou senha inválidos');
 *
 * console.log(errorResponse.isAuthenticated()); // false
 * console.log(errorResponse.getFormattedMessage()); // ❌ Email ou senha inválidos
 */
