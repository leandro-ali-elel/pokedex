import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './core/guards/login.guard';
import {SessionGuard} from './core/guards/session.guard';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';

export const routes: Routes = [
  {
    path: 'entry',
    loadChildren: () => import('./views/entry/entry.module').then(m => m.EntryModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [SessionGuard],
  },
  {
    path: '**',
    redirectTo: 'entry',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: QuicklinkStrategy})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
