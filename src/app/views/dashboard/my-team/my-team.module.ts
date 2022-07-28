import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import {MyTeamRoutingModule} from './my-team-routing.module';
import {MyTeamComponent} from './my-team.component';

@NgModule({
  declarations: [MyTeamComponent],
  imports: [CommonModule, MyTeamRoutingModule, SharedModule],
})
export class MyTeamModule {}
