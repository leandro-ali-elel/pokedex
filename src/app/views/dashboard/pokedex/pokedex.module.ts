import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {PokedexRoutingModule} from './pokedex-routing.module';
import {PokedexComponent} from './pokedex.component';
import { PokedexFacade } from './pokedex.facade';

@NgModule({
  declarations: [PokedexComponent],
  providers: [PokedexFacade],
  imports: [CommonModule, PokedexRoutingModule, SharedModule],
})
export class PokedexModule {}
