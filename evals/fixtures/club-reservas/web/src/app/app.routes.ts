import { Routes } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';

export const routes: Routes = [
  { path: 'reservar', loadComponent: () => import('./reservar/reservar.page').then(m => m.ReservarPage) },
  { path: 'reserva/:id', loadComponent: () => import('./mis-reservas/detalle.page').then(m => m.DetallePage) },
  { path: 'mis-reservas', loadComponent: () => import('./mis-reservas/mis-reservas.page').then(m => m.MisReservasPage) },
  { path: 'admin/reservas', canActivate: [AdminGuard], loadComponent: () => import('./admin/reservas-admin.page').then(m => m.ReservasAdminPage) },
];
