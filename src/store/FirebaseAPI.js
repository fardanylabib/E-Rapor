import firebase from '../FirebaseConfig';
import circularJSON from 'circular-json';
//status word

const PHONE_NUMBER_AVAILABLE = 0x01;
const OK = 0x02;
const NOK = 0x03;

//exception string
const DATABASE_QUERY_FAILED = 'Database Query Failed';
const DATABASE_WRITE_FAILED = 'Database Write Failed';
const PHONE_NUMBER_ALREADY_TAKEN = 'Nomor telepon sudah dipakai pengguna lain';

let counter=0;

//=================================Firebase Functions==================================================

//==================================SignIn/Out ===================================
export async function firebaseSignIn(email, password){
  const cridential =  await firebase.auth().signInWithEmailAndPassword(email, password)
                          .catch(function(error) {
                            throw new Error('Sign In Error: '+error.code + ' | '+error.message);
                          });
  return cridential;
}

export async function firebaseSignOut(){
  let auth = firebase.auth();
    if (auth.currentUser) {
      await auth.signOut().catch(function(error) {
        throw new Error('Sign Out Error: '+error.code + ' | '+error.message);
      });
    }
    return true; 
}

//================================== Dashboard Query ===================================
export async function firebaseQueryDashboard(isAdmin,emailSearch){
    let querySnapshot;
    if(isAdmin){
      querySnapshot = await firebase.firestore().collection('sesi').get();
    }else{
      querySnapshot =  await firebase.firestore().collection('sesi').where('email','==',emailSearch).get();
    }
    let dataList=[];
    let counter = 0;
    querySnapshot.forEach(function(snapshot){
      let snapshotData = snapshot.data();
      snapshotData['id'] = snapshot.id;
      snapshotData['key'] = counter++;
      let mapels = snapshotData['mapel'];
      let mapelList='';
      for(let mapel of mapels){
        mapelList += (mapel + '-');
      }
      mapelList = mapelList.trim();
      snapshotData['mapel'] = mapelList.substring(0,mapelList.length-1);
      dataList.push(snapshotData);
    });
    dataList.sort((a, b) => (a.key < b.key ? -1 : 1));
    console.log('list data dashboard = '+JSON.stringify(dataList));
    return dataList;
}

export async function firebaseQueryCollection(collectionName){
  const querySnapshot = await firebase.firestore().collection(collectionName).get();
  let dataList=[];
  querySnapshot.forEach(function(snapshot){
    let snapshotData = snapshot.data();
    snapshotData['id'] = snapshot.id;
    dataList.push(snapshotData);
  });
  dataList.sort((a, b) => (a.key < b.key ? -1 : 1));
  console.log('list datanya = '+JSON.stringify(dataList));
  return dataList;
}

//================================== Registration ===================================
export async function firebaseCheckPhoneExist(phoneVal){
  //check apakah sudah ada user dg no.hp yang sama
  try{
    const guruList = await firebase.firestore().collection('guru').get();
    if(guruList){
        await guruList.forEach(function(guru){
            const dataGuru = guru.data();
                if(dataGuru){
                    if( phoneVal === dataGuru.no_hp){
                        throw new Error(PHONE_NUMBER_ALREADY_TAKEN);
                    }
                }
        });
      return PHONE_NUMBER_AVAILABLE;
    }
    throw new Error(DATABASE_QUERY_FAILED);
  }catch(error){
    console.log("error disini");
    throw new Error(error.message);
  }
}

export async function firebaseRegistration(action){
  try{
    const cridential = await firebase.auth().createUserWithEmailAndPassword(action.mailVal, action.passVal);
    if(cridential){
      await cridential.user.sendEmailVerification();
      await cridential.user.updateProfile({displayName: action.nameVal});
      const userInfoStatus = await processUserInfo(action);
      return userInfoStatus;
    }
    return NOK;
  }catch(error){
    throw new Error(error.message);
  }
}  

async function processUserInfo(action){
  try{
    console.log('masuk process user info saga');
    await firebase.firestore().collection('guru').doc(action.mailVal).set({
      username: action.nameVal,
      no_hp: action.phoneVal,
      alamat: action.addrVal,
      institusi: action.instVal
    });
    return OK;
  }catch(error){
    throw new Error(DATABASE_WRITE_FAILED);
  }
}

export async function firebaseAddSession(action){
  await firebase.firestore().collection('sesi').add({
    guru: action.guruPilihan,
    kelas: action.kelasPilihan,
    mapel: action.mapelPilihan,
    murid: action.siswaPilihan,
    nama_sesi: action.courseName,
    tanggal_mulai: firebase.firestore.FieldValue.serverTimestamp()
  });
  return OK;
}

export async function firebaseDeleteSession(id){
    await firebase.firestore().collection('sesi').doc(id).delete();
    return OK;
}

// function getCurrentDate(){
//   const today = new Date();
//   const dd = today.getDate();
//   const mm = today.getMonth()+1; //As January is 0.
//   const yyyy = today.getFullYear();
//   return (dd + '/' + mm + '/' + yyyy);
// }
