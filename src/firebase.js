import firebase from 'firebase/app'
//con este import estamos habilitando el uso de la base de datos
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBRolhMHgycPY4Y9WnCjbPUqMi57ynVhLU",
    authDomain: "crud-2606c.firebaseapp.com",
    projectId: "crud-2606c",
    storageBucket: "crud-2606c.appspot.com",
    messagingSenderId: "997755185780",
    appId: "1:997755185780:web:d015e9b0896feb148abf21"
  };

//De esta manera conectamos la base de datos de firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)