import {OverlayModule} from '@angular/cdk/overlay';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgModule} from '@angular/core';
import {FooterModule} from './components/footer/footer.module';
import {HeaderModule} from './components/header/header.module';
import {ModalModule} from './components/modal/modal.module';
import {PokeCardModule} from './components/poke-card/poke-card.module';
import {PokeDetailModule} from './components/poke-detail/poke-detail.module';
import {ExtractPokemonModule} from './pipes/extract-pokemon.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    FooterModule,
    HeaderModule,
    PokeCardModule,
    ScrollingModule,
    ExtractPokemonModule,
    ModalModule,
    OverlayModule,
    PokeDetailModule,
  ],
})
export class SharedModule {}
