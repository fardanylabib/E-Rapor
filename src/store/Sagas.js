import { call, put, takeLatest, all } from 'redux-saga/effects';
import {  firebaseSignIn,
          firebaseSignOut,
          firebaseRegistration,
          firebaseCheckPhoneExist,
          firebaseQueryDashboard,
          firebaseQueryCollection
        } from './FirebaseAPI';

const ADMIN_EMAIL = 'labibfardany@gmail.com';

//status word
const PHONE_NUMBER_ALREADY_TAKEN = 'Nomor telepon sudah dipakai pengguna lain';
const PHONE_NUMBER_AVAILABLE = 0x01;
const OK = 0x02;
//=================================Saga Generator Functions==================================================
//=====================================SIGN-IN/OUT=============================================
function* signIn(action){
    console.log('SIGN-IN '+action.email+' '+action.passw);
    try{
      const cridential = yield call(firebaseSignIn,action.email,action.passw);
      let admin = false;
      if(cridential.user.emailVerified){
        if(action.email === ADMIN_EMAIL){
          admin = true;
        }
        yield put({type:'USER_LOGIN',login:true,isAdmin:admin,email:action.email}); 
      }else{
        yield put({type:'USER_LOGIN',login:false,isAdmin:false, email:''}); 
        yield put({type:'MESSAGE', variation:'warning', content:'Email belum diverifikasi, mohon verifikasi dengan klik link verifikasi di email yang anda daftarkan'});
      }
    }catch(error){
      yield put({type:'USER_LOGIN',login:false,isAdmin:false, email:''}); 
      console.log("error disini lo");
      if(error.message.includes('Query')){
        yield put({type:'MESSAGE', variation:'error', content:error.message});
      }else{
        yield put({type:'MESSAGE', variation:'error', content:'Email tidak terdaftar atau password salah'});
      }
    }    
}

function* signOut(){
    try{
      let signOut = false;
      signOut = yield call(firebaseSignOut);
      if(signOut){
        yield put({type:'USER_LOGIN',login:false});
        yield put({type:'MESSAGE', variation:'success', content:'Berhasil keluar'});
      }
    }catch(error){
      yield put({type:'MESSAGE', variation:'error', content:'Sign Out gagal'});
    }
}

//=====================================REGISTRATION=============================================
function* handleRegister(action){
  try{
    yield call(firebaseCheckPhoneExist,action.phoneVal);
    console.log("yield called");
  }catch(error){
    let errorMessage;
    if(error.message === PHONE_NUMBER_ALREADY_TAKEN){
      errorMessage = PHONE_NUMBER_ALREADY_TAKEN;
    }else{
      errorMessage = 'Internal database error '+error.message;
    }
    yield put({type:'MESSAGE', variation:'error', content: errorMessage});
    return;
  }
        
  console.log('masuk handle register saga');
  try{
    const registerStatus = yield call(firebaseRegistration,action);
    if(registerStatus === OK){
      yield put({type: 'MESSAGE', variation: 'success', content:'User telah berhasil dibuat, silahkan buka email aktivasi untuk mengaktifkan. Setelah itu, klik tombol "Konfirmasi Verifikasi".'});
      yield put({type: 'REG_SUCCESS', notRegistering: true});
    }else{
      yield put({type: 'MESSAGE', variation: 'error', content:'Registrasi gagal, mohon ganti email & password yang valid'});
    }
  }catch(error){
    let errorMessage = 'Registrasi gagal' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

function* queryCourses(action){
  try{
    //query dashboard data after sign in
    let tempRows = yield call(firebaseQueryDashboard,action.isAdmin,action.email);
    yield put({type:'DASHBOARD_DATA', rows:tempRows});
  }catch(error){
    let errorMessage = 'Courses Query Failed' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

function* queryGuru(){
  try{
    //query dashboard data after sign in
    let tempRows = yield call(firebaseQueryCollection,'guru');
    yield put({type:'GURU_DATA', guru:tempRows});
  }catch(error){
    let errorMessage = 'Courses Query Failed' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

function* queryClasses(){
  try{
    console.log("class query")
    //query dashboard data after sign in
    let tempRows = yield call(firebaseQueryCollection,'master_kelas');
    yield put({type:'CLASS_DATA', kelas:tempRows});
  }catch(error){
    let errorMessage = 'Classes Query Failed' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

function* querySiswa(){
  try{
    //query dashboard data after sign in
    let tempRows = yield call(firebaseQueryCollection,'murid');
    yield put({type:'STUDENT_DATA', siswa:tempRows});
  }catch(error){
    let errorMessage = 'Student Query Failed' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

function* queryMapel(){
  try{
    //query dashboard data after sign in
    let tempRows = yield call(firebaseQueryCollection,'master_mapel');
    yield put({type:'MAPEL_DATA', mapel:tempRows});
  }catch(error){
    let errorMessage = 'Subjects Query Failed' + error.message;
    yield put({type: 'MESSAGE', variation: 'error', content: errorMessage});
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('SIGN_IN', signIn),
    takeLatest('SIGN_OUT', signOut),
    takeLatest('REGISTER', handleRegister),
    takeLatest('COURSES', queryCourses),
    takeLatest('TEACHERS', queryGuru),
    takeLatest('CLASS', queryClasses),
    takeLatest('SUBJECTS', queryMapel),
    takeLatest('STUDENTS', querySiswa),
  ]);
}