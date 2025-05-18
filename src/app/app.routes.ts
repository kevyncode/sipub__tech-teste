import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Corrija aqui

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: '', component: DashboardComponent }, // E aqui
  // ...outras rotas
];
