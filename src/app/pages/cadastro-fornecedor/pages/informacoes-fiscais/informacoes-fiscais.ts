import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard';

@Component({
  selector: 'app-informacoes-fiscais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacoes-fiscais.html',
  styleUrl: './informacoes-fiscais.scss',
})
export class InformacoesFiscaisComponent implements OnInit {
  taxForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taxForm = this.fb.group({
      regimeTributario: ['', Validators.required],
      aliquotaIss: [''],
      retencaoIr: [''],
    });
  }

  onSubmit(): void {
    if (this.taxForm.valid) {
      this.wizardService.updateFormData({ informacoesFiscais: this.taxForm.value });
      console.log('Cadastro completo:', this.wizardService.getFormData());
      alert('Cadastro finalizado com sucesso!');
    }
  }

  voltar(): void {
    this.wizardService.previousStep();
    this.router.navigate(['/cadastro-fornecedor/principais-clientes']);
  }
}
