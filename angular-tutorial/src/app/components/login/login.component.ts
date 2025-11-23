/**
 * ========================================
 * 📚 AULA 4: COMPONENTS E REACTIVE FORMS
 * ========================================
 *
 * Nesta aula você vai aprender:
 * 1. Como criar componentes Angular
 * 2. Formulários reativos (Reactive Forms)
 * 3. Validações de formulário
 * 4. Como usar Services em Components (DI)
 * 5. Lifecycle Hooks
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response.model';
import { IUser } from '../../models/user.model';

/**
 * ========================================
 * 💡 CONCEITO: DECORATOR @Component
 * ========================================
 *
 * O decorator @Component() define metadados do componente:
 * - selector: Como usar no HTML (<app-login></app-login>)
 * - templateUrl: Arquivo HTML do componente
 * - styleUrls: Arquivos CSS do componente
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * ========================================
 * 💡 CONCEITO: IMPLEMENTS (Herança de Interface)
 * ========================================
 *
 * OnInit: Interface que força a implementação do método ngOnInit()
 * OnDestroy: Interface que força a implementação do método ngOnDestroy()
 *
 * São "Lifecycle Hooks" - ganchos do ciclo de vida do componente
 */
export class LoginComponent implements OnInit, OnDestroy {
  // ==========================================
  // PROPRIEDADES PÚBLICAS
  // ==========================================
  /**
   * 💡 CONCEITO: Reactive Forms
   *
   * FormGroup representa o formulário inteiro.
   * É "reativo" porque reage a mudanças em tempo real.
   */
  public loginForm!: FormGroup;

  // Estados da UI
  public isLoading = false;              // Mostra spinner durante login
  public errorMessage = '';              // Mensagem de erro
  public successMessage = '';            // Mensagem de sucesso
  public currentUser: IUser | null = null; // Usuário logado

  // ==========================================
  // PROPRIEDADES PRIVADAS
  // ==========================================
  /**
   * 💡 CONCEITO: Subscription
   *
   * Subscriptions precisam ser "limpas" para evitar memory leaks.
   * Armazenamos para cancelar no ngOnDestroy()
   */
  private loginSubscription?: Subscription;

  // ==========================================
  // CONSTRUCTOR - INJEÇÃO DE DEPENDÊNCIAS
  // ==========================================
  /**
   * 💡 CONCEITO OOP: Dependency Injection
   *
   * Angular injeta automaticamente:
   * - FormBuilder: Para criar formulários reativos
   * - AuthService: Nosso service customizado
   *
   * Modificador 'private' cria propriedades automaticamente:
   * - this.fb
   * - this.authService
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    console.log('🎨 LoginComponent foi criado!');
  }

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  /**
   * 💡 CONCEITO: ngOnInit()
   *
   * Executado UMA VEZ quando o componente é inicializado.
   * Ideal para:
   * - Configuração inicial
   * - Criar formulários
   * - Buscar dados
   */
  ngOnInit(): void {
    console.log('🚀 LoginComponent inicializado!');

    // Cria o formulário
    this.createForm();

    // Tenta restaurar sessão anterior
    this.restoreSession();

    // Log educacional
    this.logFormChanges();
  }

  /**
   * 💡 CONCEITO: ngOnDestroy()
   *
   * Executado quando o componente é destruído.
   * Ideal para:
   * - Cancelar subscriptions
   * - Limpar timers
   * - Liberar recursos
   */
  ngOnDestroy(): void {
    console.log('🧹 LoginComponent destruído - limpando recursos');

    // IMPORTANTE: Cancela subscription para evitar memory leak
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  // ==========================================
  // CRIAÇÃO DO FORMULÁRIO
  // ==========================================
  /**
   * Cria o formulário reativo com validações
   *
   * 💡 CONCEITO: Reactive Forms
   * Formulários reativos oferecem:
   * - Validações em tempo real
   * - Controle programático
   * - Testabilidade
   */
  private createForm(): void {
    this.loginForm = this.fb.group({
      /**
       * Campo 'email' com validações:
       * - Validators.required: Campo obrigatório
       * - Validators.email: Formato de email válido
       */
      email: ['', [Validators.required, Validators.email]],

      /**
       * Campo 'password' com validações:
       * - Validators.required: Campo obrigatório
       * - Validators.minLength(4): Mínimo 4 caracteres
       */
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    /**
     * DICA EDUCACIONAL: Preencher automaticamente para testes
     * Remova isso em produção!
     */
    this.loginForm.patchValue({
      email: 'Sincere@april.biz', // Email válido da API JSONPlaceholder
      password: '1234'
    });
  }

  // ==========================================
  // MÉTODOS PÚBLICOS (Ações do Usuário)
  // ==========================================
  /**
   * Chamado quando o usuário clica em "Entrar"
   */
  public onSubmit(): void {
    console.log('📝 Formulário submetido!');

    // Limpa mensagens anteriores
    this.errorMessage = '';
    this.successMessage = '';

    /**
     * 💡 CONCEITO: Validação de Formulário
     *
     * Verifica se o formulário é válido antes de prosseguir
     */
    if (this.loginForm.invalid) {
      console.log('❌ Formulário inválido');
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';

      // Marca todos os campos como "touched" para mostrar erros
      this.loginForm.markAllAsTouched();
      return;
    }

    // Ativa estado de loading
    this.isLoading = true;

    // Obtém valores do formulário
    const credentials = this.loginForm.value;

    console.log('🔐 Chamando AuthService.login()...');

    /**
     * 💡 CONCEITO: Subscribe em Observable
     *
     * .subscribe() "escuta" o Observable e executa quando há resposta.
     * É como .then() de Promises, mas mais poderoso.
     */
    this.loginSubscription = this.authService.login(credentials).subscribe({
      /**
       * next: Executado quando recebe dados com sucesso
       */
      next: (response: AuthResponse) => {
        console.log('📡 Resposta recebida:', response);

        this.isLoading = false;

        if (response.success) {
          // Login bem-sucedido!
          this.successMessage = response.message;
          this.currentUser = response.user || null;

          console.log('✅ Usuário logado:', this.currentUser?.name);

          // Limpa o formulário
          this.loginForm.reset();
        } else {
          // Login falhou
          this.errorMessage = response.message;
          console.log('❌ Login falhou:', response.message);
        }
      },

      /**
       * error: Executado se houver erro na requisição
       */
      error: (error) => {
        console.error('❌ Erro inesperado:', error);
        this.isLoading = false;
        this.errorMessage = 'Erro inesperado. Tente novamente.';
      }
    });
  }

  /**
   * Chamado quando o usuário clica em "Sair"
   */
  public onLogout(): void {
    console.log('👋 Logout solicitado');

    this.authService.logout();
    this.currentUser = null;
    this.successMessage = '';
    this.errorMessage = '';

    console.log('✅ Logout concluído');
  }

  /**
   * Preenche formulário com email de exemplo
   */
  public fillExampleEmail(): void {
    this.loginForm.patchValue({
      email: 'Sincere@april.biz',
      password: '1234'
    });
  }

  // ==========================================
  // GETTERS (Facilitadores de Acesso)
  // ==========================================
  /**
   * 💡 CONCEITO: Getters
   *
   * Facilitam acesso a controles do formulário no HTML
   * Uso no HTML: *ngIf="email.invalid && email.touched"
   */

  /**
   * Retorna o controle do campo email
   */
  public get email() {
    return this.loginForm.get('email')!;
  }

  /**
   * Retorna o controle do campo password
   */
  public get password() {
    return this.loginForm.get('password')!;
  }

  /**
   * Verifica se está autenticado
   */
  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // ==========================================
  // MÉTODOS AUXILIARES
  // ==========================================
  /**
   * Tenta restaurar sessão do localStorage
   */
  private restoreSession(): void {
    if (this.authService.restoreSession()) {
      this.currentUser = this.authService.getCurrentUser();
      this.successMessage = 'Sessão restaurada!';
    }
  }

  /**
   * Log educacional - mostra mudanças no formulário
   */
  private logFormChanges(): void {
    this.loginForm.valueChanges.subscribe((values) => {
      console.log('📝 Formulário mudou:', values);
      console.log('   Válido?', this.loginForm.valid);
    });
  }
}

/**
 * ========================================
 * 🎯 RESUMO: Components
 * ========================================
 *
 * COMPONENTES SÃO RESPONSÁVEIS POR:
 * ✅ Interface do usuário (View)
 * ✅ Lógica de apresentação
 * ✅ Interação com o usuário
 * ✅ Comunicação com Services
 *
 * REACTIVE FORMS OFERECEM:
 * ✅ Validações em tempo real
 * ✅ Controle programático do formulário
 * ✅ Facilidade para testar
 * ✅ Composição de validações complexas
 *
 * LIFECYCLE HOOKS:
 * ✅ ngOnInit() - Inicialização
 * ✅ ngOnDestroy() - Limpeza
 * ✅ ngOnChanges() - Mudanças em @Input
 * ✅ E vários outros...
 *
 * ========================================
 * 💡 FLUXO DE DADOS
 * ========================================
 *
 * 1. Usuário digita no formulário
 *    ↓
 * 2. FormGroup captura e valida dados
 *    ↓
 * 3. onSubmit() é chamado
 *    ↓
 * 4. Component chama AuthService.login()
 *    ↓
 * 5. AuthService faz requisição HTTP
 *    ↓
 * 6. Observable retorna resposta
 *    ↓
 * 7. Component atualiza a UI
 */
