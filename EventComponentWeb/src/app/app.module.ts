import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './main/content/content.component';
import { HeaderComponent } from './main/header/header.component';
import { EventsComponent } from './components/events/events.component';
import { EventService } from './services/events.service';
import { EventlistitemComponent } from './components/eventlistitem/eventlistitem.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AuthService } from './services/auth.service';
import { SigninComponent } from './components/Signin/signin.component';

const appRoutes: Route[] = [
  { path: 'events', component: EventsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'addEvent', component: AddEventComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    EventlistitemComponent,
    EventsComponent,
    SigninComponent,
    AddEventComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EventService, AuthService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
