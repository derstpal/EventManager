import {
  Database,
  DataSnapshot,
  get,
  onChildAdded,
  onChildRemoved,
  onChildChanged,
  push,
  ref,
  DatabaseReference,
  Query,
  update,
  onValue,
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

import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
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

  UpdateAsync(query: DatabaseReference, entity: any): Promise<void> {
    return update(query, entity);
  }

  PushAsync(refp: string, entity: any): Promise<string | null> {
    return push(ref(this.database, refp), entity).then((dbRef) => {
      console.log(`inserted entitity ${dbRef.key} in ${refp}`);
      return dbRef.key;
    });
  }

  GetAsync(query: Query): Promise<DataSnapshot> {
    return get(query);
  }

  OnChildAdded(ref: Query): Observable<any> {
    return new Observable<DataSnapshot>((subscriber) => {
      var sub = onChildAdded(
        ref,
        (data) => {
          console.table(data.val());
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

  OnChildRemoved(ref: Query): Observable<DataSnapshot> {
    return new Observable<any>((subscriber) => {
      var sub = onChildRemoved(
        ref,
        (data) => {
          console.table(data.val());
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

  OnChildChanged(ref: Query): Observable<DataSnapshot> {
    return new Observable<any>((subscriber) => {
      var sub = onChildChanged(
        ref,
        (data) => {
          console.table(data.val());
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

  FindAsync(ref: Query): Promise<DataSnapshot[]> {
   var result :DataSnapshot[]  =  new Array() ;
   var sub : Unsubscribe;
    return new Promise<DataSnapshot[]>((executor) => {
      sub = onValue(
        ref,
        (data) => {
          console.table(data.val());
          data.forEach(e => {result.push(e); return true;});
          executor(result);
        },
        (error) => {
          console.error(error);
        }
      );
    }).then(r => {
        console.log('unsubscribe firebase');
        sub();
        return r;
    });
  }
}
