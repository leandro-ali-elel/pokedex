import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FightComponent} from './fight.component';
import {FightRoutingModule} from './fight-routing.module';

@NgModule({
  declarations: [FightComponent],
  imports: [CommonModule, FightRoutingModule],
})
export class FightModule {}
