import { PeopleService } from './people.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleAddComponent } from './people-add/people-add.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleListItemComponent } from './people-list-item/people-list-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from '../firebase/firebase.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeopleComponent } from './people/people.component';
import { PeopleGenderComponent } from './people-gender/people-gender.component';
import { PeopleFoodComponent } from './people-fooddiet/people-fooddiet.component';



@NgModule({
  declarations: [
    PeopleAddComponent,
    PeopleListComponent,
    PeopleListItemComponent,
    PeopleComponent,
    PeopleGenderComponent,
    PeopleFoodComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[PeopleListComponent],
  providers: [FormBuilder, PeopleService],
})
export class PeopleModule { }
