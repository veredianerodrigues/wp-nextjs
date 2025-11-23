/**
 * ========================================
 * 📚 AULA 1: INTERFACES E CLASSES
 * ========================================
 *
 * Neste arquivo, você vai aprender:
 * 1. O que são Interfaces
 * 2. O que são Classes
 * 3. Diferença entre elas
 * 4. Quando usar cada uma
 */

// ==========================================
// INTERFACE - Contrato de Tipo
// ==========================================
/**
 * Uma INTERFACE define a "forma" que um objeto deve ter.
 * Ela NÃO cria objetos, apenas define quais propriedades são obrigatórias.
 *
 * Pense nela como um "contrato": qualquer objeto que implemente
 * esta interface PRECISA ter estas propriedades.
 */
export interface IUser {
  id: number;           // Identificador único
  name: string;         // Nome completo
  username: string;     // Nome de usuário
  email: string;        // Email
  phone?: string;       // Telefone (opcional - veja o "?")
}

/**
 * 💡 CONCEITO OOP: Type Safety (Segurança de Tipos)
 *
 * TypeScript verifica se você está usando os tipos corretos:
 *
 * ✅ CORRETO:
 * const user: IUser = {
 *   id: 1,
 *   name: "João Silva",
 *   username: "joao123",
 *   email: "joao@email.com"
 * }
 *
 * ❌ ERRO: TypeScript vai reclamar!
 * const user: IUser = {
 *   id: "1",  // ❌ Deveria ser number, não string
 *   name: "João Silva"
 *   // ❌ Faltam username e email
 * }
 */


// ==========================================
// CLASSE - Blueprint (Molde) de Objetos
// ==========================================
/**
 * Uma CLASSE é um molde para criar objetos.
 * Ela pode ter:
 * - Propriedades (dados)
 * - Métodos (funções/comportamentos)
 * - Constructor (inicializador)
 */
export class User implements IUser {
  // ==========================================
  // PROPRIEDADES (Dados do Usuário)
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Encapsulamento
   *
   * Modificadores de acesso controlam onde as propriedades podem ser acessadas:
   *
   * - public: Acessível de qualquer lugar (padrão no TypeScript)
   * - private: Só acessível dentro desta classe
   * - protected: Acessível nesta classe e em classes filhas
   */

  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public phone?: string;

  // Propriedade privada - só esta classe pode acessar
  private createdAt: Date;

  // ==========================================
  // CONSTRUCTOR (Inicializador)
  // ==========================================
  /**
   * O constructor é chamado quando criamos um novo objeto.
   *
   * Exemplo de uso:
   * const usuario = new User(1, "João", "joao123", "joao@email.com");
   */
  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    phone?: string
  ) {
    // Atribuindo valores às propriedades
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date(); // Data de criação
  }

  // ==========================================
  // MÉTODOS (Comportamentos)
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Métodos
   *
   * Métodos são funções que pertencem à classe.
   * Eles definem o que um objeto pode FAZER.
   */

  /**
   * Retorna informações formatadas do usuário
   */
  public getFullInfo(): string {
    return `${this.name} (@${this.username}) - ${this.email}`;
  }

  /**
   * Verifica se o email é válido (validação simples)
   */
  public isEmailValid(): boolean {
    return this.email.includes('@') && this.email.includes('.');
  }

  /**
   * Retorna iniciais do nome
   * Exemplo: "João Silva" → "JS"
   */
  public getInitials(): string {
    return this.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  /**
   * Método privado - só pode ser usado dentro desta classe
   * Demonstra ENCAPSULAMENTO
   */
  private getAccountAge(): number {
    const now = new Date();
    return now.getTime() - this.createdAt.getTime();
  }

  /**
   * Método público que usa um método privado
   */
  public getAccountAgeInDays(): number {
    const ageInMs = this.getAccountAge(); // Chamando método privado
    return Math.floor(ageInMs / (1000 * 60 * 60 * 24));
  }

  /**
   * 💡 CONCEITO OOP: Método Estático
   *
   * Métodos estáticos pertencem à CLASSE, não a instâncias.
   * Você chama eles assim: User.fromJSON(...)
   *
   * Útil para "factory methods" (métodos que criam objetos)
   */

  /**
   * Cria um User a partir de dados JSON da API
   */
  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.name,
      json.username,
      json.email,
      json.phone
    );
  }
}

/**
 * ========================================
 * 🎯 RESUMO: Interface vs Classe
 * ========================================
 *
 * INTERFACE:
 * ✅ Define a estrutura (contrato)
 * ✅ Apenas tipos, sem lógica
 * ✅ Não pode ser instanciada (não pode fazer: new IUser())
 * ✅ Usada para garantir que objetos tenham certas propriedades
 *
 * CLASSE:
 * ✅ Define estrutura + comportamento
 * ✅ Pode ter métodos com lógica
 * ✅ Pode ser instanciada (pode fazer: new User(...))
 * ✅ Suporta encapsulamento (private/public)
 * ✅ Pode ter constructor
 *
 * ========================================
 * 💡 QUANDO USAR CADA UMA?
 * ========================================
 *
 * Use INTERFACE quando:
 * - Você só precisa definir a forma dos dados
 * - Está recebendo dados de uma API
 * - Quer garantir type safety
 *
 * Use CLASSE quando:
 * - Precisa de métodos e comportamentos
 * - Quer encapsular lógica
 * - Precisa de um constructor customizado
 *
 * DICA: Você pode usar ambas!
 * A classe User implementa a interface IUser.
 */
