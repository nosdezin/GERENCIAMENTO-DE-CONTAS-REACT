import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGX7_tLDhFSOD10ftfy-tNTS-8K0iL3ew",
  authDomain: "crud-account-9061c.firebaseapp.com",
  projectId: "crud-account-9061c",
  storageBucket: "crud-account-9061c.appspot.com",
  messagingSenderId: "840799115155",
  appId: "1:840799115155:web:7e167dc5e27ecb1a797a66",
};

const app = initializeApp(firebaseConfig);

export const dbFB = getFirestore(app);
