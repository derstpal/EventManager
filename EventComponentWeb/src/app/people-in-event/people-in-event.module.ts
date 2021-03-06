import { PeopleModule } from './../people/people.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleInEventListComponent } from './components/people-in-event-list/people-in-event-list.component';
import { PeopleInEventListItemComponent } from './components/people-in-event-list-item/people-in-event-list-item.component';
import { PeopleInEventComponent } from './components/people-in-event/people-in-event.component';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseModule } from '../firebase/firebase.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PeopleInEventListComponent,
    PeopleInEventListItemComponent,
    PeopleInEventComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FirebaseModule,
    AppRoutingModule,
    PeopleModule
  ],
  providers: [],
})
export class PeopleInEventModule { }
