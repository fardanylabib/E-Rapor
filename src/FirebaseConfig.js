
import * as firebase from "firebase";

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCJP11Y2rVG2dItblH4F-1R-KghQfmNEyY",
  authDomain: "almas-tutoring.firebaseapp.com",
  databaseURL: "https://almas-tutoring.firebaseio.com",
  projectId: "almas-tutoring",
  storageBucket: "almas-tutoring.appspot.com",
  messagingSenderId: "602619307592"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
