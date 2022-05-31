import { PeopleModule } from './people/people.module';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleAddComponent } from './people/people-add/people-add.component';
import { EventModule } from './event/event.module';
import { FirebaseModule } from './firebase/firebase.module';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './main/content/content.component';
import { HeaderComponent } from './main/header/header.component';
import { AuthService } from './services/auth.service';
import { SigninComponent } from './components/Signin/signin.component';
import { FourOFourComponent } from './main/four-ofour/four-ofour.component';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';

const appRoutes: Route[] = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: FourOFourComponent },
  { path: 'events', component: EventListComponent , canActivate: [AuthService] },
  {
    path: 'addEvent',
    component: EventAddComponent,
    canActivate: [AuthService],
  },
  { path: 'peoples', component: PeopleListComponent , canActivate: [AuthService] },
  {
    path: 'addPeople',
    component: PeopleAddComponent,
    canActivate: [AuthService],
  },
  { path: '**', component: FourOFourComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    FourOFourComponent,
  ],
  imports: [
    PeopleModule,
    EventModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FirebaseModule,
    BrowserAnimationsModule,
    MatDatepickerModule
  ],
  providers: [
    FormBuilder,
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
