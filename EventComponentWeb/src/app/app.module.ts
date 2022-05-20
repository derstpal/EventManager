import { SignupComponent } from './components/signup/signup.component';
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
import { FourOFourComponent } from './main/four-ofour/four-ofour.component';
import { HttpClient } from '@angular/common/http';
import { FireBaseService } from './services/fire-base.service';

const appRoutes: Route[] = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: FourOFourComponent },
  { path: 'events', component: EventsComponent, canActivate: [AuthService] },
  {
    path: 'addEvent',
    component: AddEventComponent,
    canActivate: [AuthService],
  },
  { path: '**', component: FourOFourComponent },
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
    SignupComponent,
    FourOFourComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FireBaseService,
    AuthService,
    FormBuilder,
    HttpClient,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
