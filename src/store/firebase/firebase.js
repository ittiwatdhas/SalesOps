import firebase from 'firebase'
import 'firebase/firestore'
// import 'firebase/analytics'

let conf = {
  apiKey: 'AIzaSyCLC3udMECGbsMklSXTvUQDL9q5vTbBXW8',
  authDomain: 'salesops-admin.firebaseapp.com',
  databaseURL: 'https://salesops-admin-default-rtdb.firebaseio.com',
  projectId: 'salesops-admin',
  messagingSenderId: '1037679174387',
  appId: '1:1037679174387:web:1b8fa98539e8077eba0d86',
  measurementId: "G-807GK0HYFN"
}

// if (process.env.VUE_APP_FIREBASE_API_KEY == undefined) {
//   alert('WARNING!! No firebase config!')
// }

export const fb = firebase.initializeApp(conf)
export const db = fb.database();