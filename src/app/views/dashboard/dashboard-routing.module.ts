import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'my-team',
        loadChildren: () => import('./my-team/my-team.module').then(m => m.MyTeamModule),
      },
      {
        path: 'my-box',
        loadChildren: () => import('./my-box/my-box.module').then(m => m.MyBoxModule),
      },
      {
        path: 'pokedex',
        loadChildren: () => import('./pokedex/pokedex.module').then(m => m.PokedexModule),
      },
      {
        path: 'fight',
        loadChildren: () => import('./fight/fight.module').then(m => m.FightModule),
      },
      {
        path: '**',
        redirectTo: 'pokedex',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
