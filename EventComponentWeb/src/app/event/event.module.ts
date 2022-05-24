import { FirebaseModule } from './../firebase/firebase.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventListItemComponent } from './event-list-item/event-list-item.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventService } from './services/events.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    EventListItemComponent,
    EventAddComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
    AppRoutingModule,
  ],
  providers: [FormBuilder, EventService]
})
export class EventModule { }
