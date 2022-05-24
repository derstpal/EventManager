import {
  Database,
  DataSnapshot,
  get,
  off,
  onValue,
  onChildAdded,
  onChildRemoved,
  onChildChanged,
  push,
  ref,
  ThenableReference,
  DatabaseReference,
} from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  Unsubscribe,
} from 'firebase/auth';
import { map, Observable, observable, pipe, Subscriber } from 'rxjs';

const firebaseConfig = {
  apiKey: 'AIzaSyCzCGo7pgRVeU-Sy5ZbJ4IINlnuVgLp2u8',
  authDomain: 'eventmanagement-9ba65.firebaseapp.com',
  databaseURL:
    'https://eventmanagement-9ba65-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'eventmanagement-9ba65',
  storageBucket: 'eventmanagement-9ba65.appspot.com',
  messagingSenderId: '290917298219',
  appId: '1:290917298219:web:4d3766bb99f33bbb9cfa6e',
};

// Initialize Firebase

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  private firebase: FirebaseApp;
  private auth;
  database: Database;

  constructor() {
    this.firebase = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebase);
    this.database = getDatabase(this.firebase);
  }

  CreateUserWithEmailAndPasswordAsync(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  SigninAsync(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  SignoutAsync(): Promise<void> {
    return this.auth.signOut();
  }

  GetDatabaseReference(refp: string): DatabaseReference {
    return ref(this.database, refp);
  }

  PushAsync(refp: string, entity: any): Promise<string | null> {
    return push(ref(this.database, refp), entity).then((dbRef) => {
      console.log(`inserted entitity ${dbRef.key} in ${refp}`);
      return dbRef.key;
    });
  }

  GetAsync(refp: string): Promise<DataSnapshot> {
    return get(ref(this.database, refp));
  }

  OnChildAdded(ref: DatabaseReference): Observable<any> {
    return new Observable<DataSnapshot>((subscriber) => {
      var sub = onChildAdded(
        ref,
        (data) => {
          console.table(data);
          subscriber.next(data);
        },
        (error) => {
          console.error(error);
          subscriber.error(error);
        }
      );
      return () => {
        console.log('unsubscribe firebase');
        sub();
      };
    });
  }

  OnChildRemoved(ref: DatabaseReference): Observable<DataSnapshot> {
    return new Observable<any>((subscriber) => {
      var sub =  onChildRemoved(
        ref,
        (data) => {
          console.table(data);
          subscriber.next(data);
        },
        (error) => {
          console.error(error);
        }
      );
      return () => {
        console.log('unsubscribe firebase');
        sub();
      };
    });
  }

  OnChildChanged(ref: DatabaseReference): Observable<DataSnapshot> {
    return new Observable<any>((subscriber) => {
      var sub =  onChildChanged(
        ref,
        (data) => {
          console.table(data);
          subscriber.next(data);
        },
        (error) => {
          console.error(error);
        }
      );
      return () => {
        console.log('unsubscribe firebase');
        sub();
      };
    });
  }
}
