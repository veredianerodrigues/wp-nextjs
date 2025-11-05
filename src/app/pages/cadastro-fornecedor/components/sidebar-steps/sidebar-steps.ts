import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WizardService, WizardStep } from '../../services/wizard';

@Component({
  selector: 'app-sidebar-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-steps.html',
  styleUrl: './sidebar-steps.scss',
})
export class SidebarStepsComponent implements OnInit {
  steps: WizardStep[] = [];
  currentStep: number = 1;

  constructor(
    private wizardService: WizardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.steps = this.wizardService.getSteps();
    this.wizardService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }

  isStepActive(stepId: number): boolean {
    return this.currentStep === stepId;
  }

  isStepCompleted(stepId: number): boolean {
    return this.wizardService.isStepCompleted(stepId);
  }

  isStepAccessible(stepId: number): boolean {
    // Permite acessar a etapa atual ou etapas já completadas
    return stepId <= this.currentStep || this.isStepCompleted(stepId);
  }

  goToStep(step: WizardStep): void {
    if (this.isStepAccessible(step.id)) {
      this.wizardService.setCurrentStep(step.id);
      this.router.navigate(['/cadastro-fornecedor', step.route]);
    }
  }
}
