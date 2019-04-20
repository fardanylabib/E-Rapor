import firebase from '../FirebaseConfig';
import { put, takeLatest, all } from 'redux-saga/effects';

function* firebaseSignIn(email,passw){
    console.log("SIGN-IN "+email+" "+passw);
    let auth = firebase.auth(); 
    yield auth.signInWithEmailAndPassword(email, passw)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " | "+errorMessage);
    });

    if(auth.currentUser){
      if(auth.currentUser.emailVerified){
        yield put({type:"USER_LOGIN",login:true}); 
      }else{
        yield put({type:"USER_LOGIN",login:false}); 
      }
    }else{
      yield put({type:"USER_LOGIN",login:false}); 
    }   
}

function* firebaseSignOut(){
    console.log("SIGN-OUT"); 
    let auth = firebase.auth();
    if (auth.currentUser) {
      yield auth.signOut()
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " | "+errorMessage);
      });
      yield put({type:"USER_LOGIN",login:false}); 
    } 
}

export default function* rootSaga() {
  yield all([
    takeLatest("SIGN_IN", firebaseSignIn),
    takeLatest("SIGN_OUT", firebaseSignOut)
  ]);
}