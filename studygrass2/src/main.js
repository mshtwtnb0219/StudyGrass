import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebaseConfig from '../public/firebaseConfig'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// firebaseの初期化
const app = initializeApp(firebaseConfig);

// firesotore,Authenticationの初期化
export const db = getFirestore(app);
export const auth = getAuth();

createApp(App).use(router).mount('#app');
