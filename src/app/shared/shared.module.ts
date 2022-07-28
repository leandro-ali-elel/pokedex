import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FooterModule} from './components/footer/footer.module';
import {HeaderModule} from './components/header/header.module';
import {PokeCardModule} from './components/poke-card/poke-card.module';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [CommonModule, FooterModule, HeaderModule, PokeCardModule, ScrollingModule],
  exports: [FooterModule, HeaderModule, PokeCardModule, ScrollingModule],
})
export class SharedModule {}
