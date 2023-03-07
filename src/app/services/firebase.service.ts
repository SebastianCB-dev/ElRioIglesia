import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { addDoc,
         collection,
         doc,
         Firestore,
         getDoc,
         getDocs,
         getFirestore,
         query,
         setDoc,
         where} from 'firebase/firestore';
import { User } from '../interface/user';
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
    this.getMaxId();
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

  createUser(user: User, role: string) {
    user.role = role;
    return setDoc(doc(this.db, "users", user.documento.toString()), user);
  }

  async getUser(documento: string) {
    try {
      const docRef = doc(this.db, "users", documento);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    }
    catch(err) {
      return null;
    }
  }

  async getMaxId() {
    const querySearch = query(collection(this.db, 'users'));
    const querySnapshot = await getDocs(querySearch);
    const ids: number[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data['id'];
    })
    return Math.max(...ids) + 1;
  }

  async getUserByID(id: number) {
    const querySearch = query(collection(this.db, 'users'),
                              where('id', '==', id));
    const querySnapshot = await getDocs(querySearch);
    const user = querySnapshot.docs;
    if(user.length === 0)
      return null;
    return user[0].data();
  }

  async getNinoByName(name: string) {
    const regexName = new RegExp(name, 'i');
    const querySearch = query(collection(this.db, 'users'),
                              where('role', '==', 'nino'));
    const querySnapshot = await getDocs(querySearch);
    const user = querySnapshot.docs;
    if(user.length === 0)
      return null;
    return user.filter((doc) => regexName.test((doc.data() as User).fullname))
            .map((doc) => doc.data());
  }
}
