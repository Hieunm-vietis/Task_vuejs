import Firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyDYz7hfOZszeeWaGbHEKL7iYkQop8J5FRc",
    authDomain: "project-firebase-2a855.firebaseapp.com",
    projectId: "project-firebase-2a855",
    storageBucket: "project-firebase-2a855.appspot.com",
    messagingSenderId: "118674998790",
    appId: "1:118674998790:web:6f6e012c46f280b22a2587",
    measurementId: "G-FTG1QS9M5H",
    databaseURL: "https://project-firebase-2a855-default-rtdb.firebaseio.com/",
};
      
Firebase.initializeApp(firebaseConfig)
export default Firebase.database();
