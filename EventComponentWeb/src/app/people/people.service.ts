import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {


  constructor(public firebaseService : FirebaseService) { }


}
