import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [FirebaseService]
})
export class FirebaseModule { }
