import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA48x6tq60JBUCP0vyS059kc7hHEhCvchc",
  authDomain: "odojo-a7f5e.firebaseapp.com",
  projectId: "odojo-a7f5e",
  storageBucket: "odojo-a7f5e.appspot.com",
  messagingSenderId: "94155362845",
  appId: "1:94155362845:web:c3708264e272b478be6cf4"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }