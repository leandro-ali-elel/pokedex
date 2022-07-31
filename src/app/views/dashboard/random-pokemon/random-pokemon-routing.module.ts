import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RandomPokemonComponent} from './random-pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: RandomPokemonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomPokemonRoutingModule {}
