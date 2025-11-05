import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WizardStep {
  id: number;
  label: string;
  route: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private steps: WizardStep[] = [
    { id: 1, label: 'Informações da Empresa', route: 'informacoes-empresa', completed: false },
    { id: 2, label: 'Dados Bancários', route: 'dados-bancarios', completed: false },
    { id: 3, label: 'Principais Contatos', route: 'principais-contatos', completed: false },
    { id: 4, label: 'Principais Clientes', route: 'principais-clientes', completed: false },
    { id: 5, label: 'Informações Fiscais', route: 'informacoes-fiscais', completed: false },
  ];

  private currentStepSubject = new BehaviorSubject<number>(1);
  public currentStep$: Observable<number> = this.currentStepSubject.asObservable();

  private formDataSubject = new BehaviorSubject<any>({});
  public formData$: Observable<any> = this.formDataSubject.asObservable();

  constructor() {}

  getSteps(): WizardStep[] {
    return this.steps;
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  setCurrentStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      this.currentStepSubject.next(step);
    }
  }

  nextStep(): void {
    const current = this.currentStepSubject.value;
    if (current < this.steps.length) {
      this.steps[current - 1].completed = true;
      this.currentStepSubject.next(current + 1);
    }
  }

  previousStep(): void {
    const current = this.currentStepSubject.value;
    if (current > 1) {
      this.currentStepSubject.next(current - 1);
    }
  }

  isStepCompleted(stepId: number): boolean {
    return this.steps[stepId - 1]?.completed || false;
  }

  updateFormData(stepData: any): void {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...stepData });
  }

  getFormData(): any {
    return this.formDataSubject.value;
  }

  resetWizard(): void {
    this.currentStepSubject.next(1);
    this.steps.forEach(step => step.completed = false);
    this.formDataSubject.next({});
  }
}
