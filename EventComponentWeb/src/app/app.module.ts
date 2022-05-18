import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header } from './main/header.compononent/header.compononent.component';
import { Header } from './main/header.component/header.component.component';
import { Content } from './main/content.component/content.component.component';

@NgModule({
  declarations: [
    AppComponent,
    Header.CompononentComponent,
    Header.ComponentComponent,
    Content.ComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
