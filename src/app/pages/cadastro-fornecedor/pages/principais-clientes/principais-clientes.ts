import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard';

@Component({
  selector: 'app-principais-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './principais-clientes.html',
  styleUrl: './principais-clientes.scss',
})
export class PrincipaisClientesComponent implements OnInit {
  clientsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientsForm = this.fb.group({
      nomeCliente: ['', Validators.required],
      cnpjCliente: [''],
      telefoneCliente: [''],
    });
  }

  onSubmit(): void {
    if (this.clientsForm.valid) {
      this.wizardService.updateFormData({ principaisClientes: this.clientsForm.value });
      this.wizardService.nextStep();
      this.router.navigate(['/cadastro-fornecedor/informacoes-fiscais']);
    }
  }

  voltar(): void {
    this.wizardService.previousStep();
    this.router.navigate(['/cadastro-fornecedor/principais-contatos']);
  }
}
