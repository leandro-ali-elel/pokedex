import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'choose-team',
        loadChildren: () => import('./choose-team/choose-team.module').then(m => m.ChooseTeamModule),
      },
      {
        path: 'fight',
        loadChildren: () => import('./fight/fight.module').then(m => m.FightModule),
      },
      {
        path: '**',
        redirectTo: 'choose-team',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
