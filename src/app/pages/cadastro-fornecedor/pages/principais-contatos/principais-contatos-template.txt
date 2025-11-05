import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard';

@Component({
  selector: 'app-principais-contatos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './principais-contatos.html',
  styleUrl: './principais-contatos.scss',
})
export class PrincipaisContatosComponent implements OnInit {
  contactsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactsForm = this.fb.group({
      nomeContato: ['', Validators.required],
      cargoContato: [''],
      emailContato: ['', [Validators.required, Validators.email]],
      telefoneContato: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactsForm.valid) {
      this.wizardService.updateFormData({ principaisContatos: this.contactsForm.value });
      this.wizardService.nextStep();
      this.router.navigate(['/cadastro-fornecedor/principais-clientes']);
    }
  }

  voltar(): void {
    this.wizardService.previousStep();
    this.router.navigate(['/cadastro-fornecedor/dados-bancarios']);
  }
}
