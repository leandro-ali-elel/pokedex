import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {RandomPokemonRoutingModule} from './random-pokemon-routing.module';
import {RandomPokemonComponent} from './random-pokemon.component';

@NgModule({
  declarations: [RandomPokemonComponent],
  imports: [CommonModule, RandomPokemonRoutingModule, SharedModule],
})
export class RandomPokemonModule {}
