import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterModule} from './components/footer/footer.module';
import {HeaderModule} from './components/header/header.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FooterModule, HeaderModule],
  exports: [FooterModule, HeaderModule],
})
export class SharedModule {}
