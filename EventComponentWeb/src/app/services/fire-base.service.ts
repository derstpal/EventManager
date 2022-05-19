import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzCGo7pgRVeU-Sy5ZbJ4IINlnuVgLp2u8",
  authDomain: "eventmanagement-9ba65.firebaseapp.com",
  projectId: "eventmanagement-9ba65",
  storageBucket: "eventmanagement-9ba65.appspot.com",
  messagingSenderId: "290917298219",
  appId: "1:290917298219:web:4d3766bb99f33bbb9cfa6e"
};

// Initialize Firebase


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  private firebase : FirebaseApp;
  private auth;

  constructor() {
    this.firebase = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebase);
  }

  CreateUserWithEmailAndPasswordAsync(email : string, password : string) : Promise<UserCredential>
  {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  SigninAsync(email : string, password : string) : Promise<UserCredential>
  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  SignoutAsync() : Promise<void>
  {
    return this.auth.signOut();
  }
}
