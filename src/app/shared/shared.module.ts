import {OverlayModule} from '@angular/cdk/overlay';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgModule} from '@angular/core';
import {QuicklinkModule} from 'ngx-quicklink';
import {DialogModule} from './components/dialog/dialog.module';
import {FooterModule} from './components/footer/footer.module';
import {HeaderModule} from './components/header/header.module';
import {ModalModule} from './components/modal/modal.module';
import {PokeCardModule} from './components/poke-card/poke-card.module';
import {PokeDetailModule} from './components/poke-detail/poke-detail.module';
import {ToastModule} from './components/toast/toast.module';
import {ExtractPokemonModule} from './pipes/extract-pokemon.module';

@NgModule({
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
    ToastModule,
    QuicklinkModule,
    DialogModule,
  ],
})
export class SharedModule {}
