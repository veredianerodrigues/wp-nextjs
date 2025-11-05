import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarStepsComponent } from '../components/sidebar-steps/sidebar-steps';

@Component({
  selector: 'app-cadastro-fornecedor-container',
  standalone: true,
  imports: [RouterOutlet, SidebarStepsComponent],
  templateUrl: './cadastro-fornecedor-container.html',
  styleUrl: './cadastro-fornecedor-container.scss',
})
export class CadastroFornecedorContainerComponent {

}
