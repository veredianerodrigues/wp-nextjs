import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard';

@Component({
  selector: 'app-informacoes-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacoes-empresa.html',
  styleUrl: './informacoes-empresa.scss',
})
export class InformacoesEmpresaComponent implements OnInit {
  companyForm!: FormGroup;

  categorias = ['Fornecedor de Produtos', 'Fornecedor de Serviços', 'Distribuidor', 'Fabricante'];
  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  tiposContribuinte = ['Contribuinte ICMS', 'Contribuinte isento de inscrição', 'Não contribuinte'];
  portes = ['Microempresa (ME)', 'Empresa de Pequeno Porte (EPP)', 'Média Empresa', 'Grande Empresa'];
  tiposEmpresa = ['Ltda', 'S/A', 'Eireli', 'MEI', 'SLU'];
  formasSocietarias = ['Sociedade Limitada', 'Sociedade Anônima', 'Empresário Individual', 'EIRELI', 'Sociedade Simples'];

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSavedData();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      // Grupo 1 - Identificação
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      nomeFantasia: [''],
      categoria: [''],

      // Grupo 2 - Endereço
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: [''],

      // Grupo 3 - Contato
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],

      // Grupo 4 - Dados Jurídicos
      tipoContribuinte: [''],
      porte: [''],
      tipoEmpresa: [''],
      cnpjCpf: ['', [Validators.required, Validators.pattern(/^\d{11}$|^\d{14}$/)]],
      inscricaoEstadualRg: [''],
      inscricaoMunicipal: [''],
      formaSocietaria: [''],
    });
  }

  loadSavedData(): void {
    const savedData = this.wizardService.getFormData();
    if (savedData.informacoesEmpresa) {
      this.companyForm.patchValue(savedData.informacoesEmpresa);
    }
  }

  onCepBlur(): void {
    const cep = this.companyForm.get('cep')?.value?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      // Simulação de busca de CEP - em produção, usar ViaCEP API
      // fetch(`https://viacep.com.br/ws/${cep}/json/`)
      console.log('Buscar CEP:', cep);
    }
  }

  formatCep(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
    }
    this.companyForm.get('cep')?.setValue(value, { emitEvent: false });
  }

  formatTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.companyForm.get('telefone')?.setValue(value, { emitEvent: false });
  }

  formatCnpjCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // CPF
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else {
      // CNPJ
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
    this.companyForm.get('cnpjCpf')?.setValue(value, { emitEvent: false });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.companyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.companyForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['email']) return 'E-mail inválido';
      if (field.errors['minLength']) return 'Mínimo de caracteres não atingido';
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.wizardService.updateFormData({
        informacoesEmpresa: this.companyForm.value
      });
      this.wizardService.nextStep();
      this.router.navigate(['/cadastro-fornecedor/dados-bancarios']);
    } else {
      Object.keys(this.companyForm.controls).forEach(key => {
        this.companyForm.get(key)?.markAsTouched();
      });
    }
  }
}
