import { Routes } from '@angular/router';
import { cadastroFornecedorRoutes } from './pages/cadastro-fornecedor/cadastro-fornecedor-routing-module';

export const routes: Routes = [
  { path: '', redirectTo: '/cadastro-fornecedor', pathMatch: 'full' },
  { path: 'cadastro-fornecedor', children: cadastroFornecedorRoutes }
];
