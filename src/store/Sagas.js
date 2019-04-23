import firebase from '../FirebaseConfig';
import { put, takeLatest, all } from 'redux-saga/effects';
const adminEmail = 'labibfardany@gmail.com';

function* firebaseSignIn(action){
    console.log('SIGN-IN '+action.email+' '+action.passw);
    let auth = firebase.auth(); 
    yield auth.signInWithEmailAndPassword(action.email, action.passw)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ' | '+errorMessage);
    });

    if(auth.currentUser){
      if(auth.currentUser.emailVerified){
        let admin = false;
        if(action.email === adminEmail){
          admin = true;
        }
        yield put({type:'USER_LOGIN',login:true,isAdmin:admin}); 
      }else{
        yield put({type:'USER_LOGIN',login:false}); 
        yield put({type:'MESSAGE', variation:'warning', content:'Email belum diverifikasi, mohon verifikasi dengan klik link verifikasi di email yang anda daftarkan'});
      }
    }else{
      yield put({type:'USER_LOGIN',login:false}); 
      yield put({type:'MESSAGE', variation:'error', content:'Email tidak terdaftar atau password salah'});
    }      
}

function* firebaseSignOut(){
    let auth = firebase.auth();
    if (auth.currentUser) {
      yield auth.signOut()
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' | '+errorMessage);
      });
      yield put({type:'USER_LOGIN',login:false}); 
    } 
}

export default function* rootSaga() {
  yield all([
    takeLatest('SIGN_IN', firebaseSignIn),
    takeLatest('SIGN_OUT', firebaseSignOut)
  ]);
}