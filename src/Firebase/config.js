import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
export const app = firebase.initializeApp({
  apiKey: "AIzaSyB0R3XWNRlNPyM2nkuWvwfKqjJIvSZ-U2A",
  authDomain: "phsproject-40dfd.firebaseapp.com",
  databaseURL: "https://phsproject-40dfd.firebaseio.com",
  projectId: "phsproject-40dfd",
  storageBucket: "phsproject-40dfd.appspot.com",
  messagingSenderId: "706779780485",
  appId: "1:706779780485:web:a61b79ec66c7b669a1e0ec",
  measurementId: "G-J6DFWBB9L9"
})
  export const db = app.database()
export const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ], 
    callbacks: {
      signInSuccess: () => console.log("SUCCESS!!!!")
    }
  }