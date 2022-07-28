import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyBoxComponent} from './my-box.component';

const routes: Routes = [
  {
    path: '',
    component: MyBoxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBoxRoutingModule {}
