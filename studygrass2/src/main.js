import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  firebaseConfig  from '../public/firebaseConfig'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

createApp(App).use(router).mount('#app')

// firebaseの初期化
const app = initializeApp(firebaseConfig);

// firesotoreの初期化
export const db = getFirestore(app);