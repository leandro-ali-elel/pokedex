import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FooterModule} from './components/footer/footer.module';
import {HeaderModule} from './components/header/header.module';
import {PokeCardModule} from './components/poke-card/poke-card.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    PokeCardModule,
    ScrollingModule,
    PokeCardModule,
  ],
  exports: [FooterModule, HeaderModule, PokeCardModule, ScrollingModule, PokeCardModule],
})
export class SharedModule {}
