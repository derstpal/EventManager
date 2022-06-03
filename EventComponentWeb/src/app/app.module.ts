import { PeopleInEventModule } from './people-in-event/people-in-event.module';
import { PeopleInEventComponent } from './people-in-event/components/people-in-event/people-in-event.component';
import { InviteComponent } from './people-in-event/components/invite/invite.component';
import { EventComponent } from './event/event/event.component';
import { PeopleModule } from './people/people.module';
import { PeopleAddComponent } from './people/people-add/people-add.component';
import { EventModule } from './event/event.module';
import { FirebaseModule } from './firebase/firebase.module';
import { EventAddComponent } from './event/event-add/event-add.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PeopleComponent } from './people/people/people.component';

const appRoutes: Route[] = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: FourOFourComponent },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'addEvent',
        component: EventAddComponent,
        canActivate: [AuthService],
      },
    ],
  },
  {
    path: 'peoples',
    component: PeopleComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'addPeople',
        component: PeopleAddComponent,
        canActivate: [AuthService],
      },
    ],
  },
  {
    path: 'peoplesInEvent/:id',
    component: PeopleInEventComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'invite',
        component: InviteComponent,
        canActivate: [AuthService],
      },
    ],
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
    PeopleInEventModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FirebaseModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  providers: [FormBuilder, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
