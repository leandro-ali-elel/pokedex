import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChooseTeamComponent} from './choose-team.component';
import {ChooseTeamRoutingModule} from './choose-team-routing.module';

@NgModule({
  declarations: [ChooseTeamComponent],
  imports: [CommonModule, ChooseTeamRoutingModule],
})
export class ChooseTeamModule {}
