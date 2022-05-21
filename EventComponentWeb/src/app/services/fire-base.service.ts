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

  OnChildAdded(
    ref: DatabaseReference,
    callback: (key: string | null, item: any) => unknown
  ): Unsubscribe {
    var internalCb = this.getEventCallBack(callback, 'Added', ref);
    return onChildAdded(ref, internalCb, (error) => {
      console.error(error);
    });
  }
  OnChildRemoved(
    ref: DatabaseReference,
    callback: (key: string | null, item: any) => unknown
  ): Unsubscribe {
    var internalCb = this.getEventCallBack(callback, 'removed', ref);
    return onChildRemoved(ref, internalCb, (error) => {
      console.error(error);
    });
  }

  OnChildChanged(
    ref: DatabaseReference,
    callback: (key: string | null, item: any) => unknown
  ): Unsubscribe {
    var internalCb = this.getEventCallBack(callback, 'updated', ref);
    return onChildChanged(ref, internalCb, (error) => {
      console.error(error);
    });
  }

  private getEventCallBack(
    callback: (key: string | null, item: any) => unknown,
    action: string,
    ref: DatabaseReference
  ) {
    return (snapshot: DataSnapshot) => {
      console.log(`Child ${action} in ${ref.toString()}:`);
      callback(snapshot.key, snapshot.val());
      console.table(snapshot.val());
    };
  }
}
