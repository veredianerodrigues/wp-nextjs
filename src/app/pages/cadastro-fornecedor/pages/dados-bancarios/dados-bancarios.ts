import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard';

@Component({
  selector: 'app-dados-bancarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dados-bancarios.html',
  styleUrl: './dados-bancarios.scss',
})
export class DadosBancariosComponent implements OnInit {
  bankForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bankForm = this.fb.group({
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      tipoConta: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.bankForm.valid) {
      this.wizardService.updateFormData({ dadosBancarios: this.bankForm.value });
      this.wizardService.nextStep();
      this.router.navigate(['/cadastro-fornecedor/principais-contatos']);
    }
  }

  voltar(): void {
    this.wizardService.previousStep();
    this.router.navigate(['/cadastro-fornecedor/informacoes-empresa']);
  }
}
