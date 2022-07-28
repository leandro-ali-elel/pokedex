import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {MyBoxRoutingModule} from './my-box-routing.module';
import {MyBoxComponent} from './my-box.component';

@NgModule({
  declarations: [MyBoxComponent],
  imports: [CommonModule, MyBoxRoutingModule, SharedModule],
})
export class MyBoxModule {}
