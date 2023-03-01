import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { addDoc, 
         collection, 
         Firestore, 
         getFirestore } from 'firebase/firestore';
import { UserNino } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public firebaseConfig = {};
  public app!: FirebaseApp;
  public db!: Firestore;
  public analytics!: Analytics;

  constructor() {
    this.init();
  }

  init() {
    this.firebaseConfig = {
      apiKey: "AIzaSyBLKRclmROuAyaYgj0ECBrSMVI1cCbQSMw",
      authDomain: "elrio-3b9a0.firebaseapp.com",
      projectId: "elrio-3b9a0",
      storageBucket: "elrio-3b9a0.appspot.com",
      messagingSenderId: "203957913792",
      appId: "1:203957913792:web:40bc99148b49a328bfc525",
      measurementId: "G-T8JK1DEXJD"
    };

    // Initialize Firebase
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore();
    this.analytics = getAnalytics(this.app);
  }

  async createUser(user: UserNino, role: string) {
    await addDoc(collection(this.db, 'users'), {
     user,
     role,
    });
  }

}
