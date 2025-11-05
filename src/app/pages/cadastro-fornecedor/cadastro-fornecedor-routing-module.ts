import { Routes } from '@angular/router';
import { CadastroFornecedorContainerComponent } from './cadastro-fornecedor-container/cadastro-fornecedor-container';
import { InformacoesEmpresaComponent } from './pages/informacoes-empresa/informacoes-empresa';
import { DadosBancariosComponent } from './pages/dados-bancarios/dados-bancarios';
import { PrincipaisContatosComponent } from './pages/principais-contatos/principais-contatos';
import { PrincipaisClientesComponent } from './pages/principais-clientes/principais-clientes';
import { InformacoesFiscaisComponent } from './pages/informacoes-fiscais/informacoes-fiscais';

export const cadastroFornecedorRoutes: Routes = [
  {
    path: '',
    component: CadastroFornecedorContainerComponent,
    children: [
      { path: '', redirectTo: 'informacoes-empresa', pathMatch: 'full' },
      { path: 'informacoes-empresa', component: InformacoesEmpresaComponent },
      { path: 'dados-bancarios', component: DadosBancariosComponent },
      { path: 'principais-contatos', component: PrincipaisContatosComponent },
      { path: 'principais-clientes', component: PrincipaisClientesComponent },
      { path: 'informacoes-fiscais', component: InformacoesFiscaisComponent },
    ]
  }
];
