import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {NGRXModule} from './ngrx.module';
import {SharedModule} from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    GraphQLModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NGRXModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
