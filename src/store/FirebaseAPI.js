import firebase from '../FirebaseConfig';
import * as Util from './Util';
const JSON = require('circular-json');
//status word

const PHONE_NUMBER_AVAILABLE = 0x01;
const OK = 0x02;
const NOK = 0x03;

//exception string
const DATABASE_QUERY_FAILED = 'Database Query Failed';
const DATABASE_WRITE_FAILED = 'Database Write Failed';
const PHONE_NUMBER_ALREADY_TAKEN = 'Nomor telepon sudah dipakai pengguna lain';

let counter = 0;

const db = firebase.firestore();
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
    let querySnapshot = null;
    let dataList=[];
    let counter = 0;
    if(isAdmin){
      querySnapshot = await db.collection('sesi').get();
    }else{
      querySnapshot =  await db.collection('sesi').where('email','==',emailSearch).get();
    }
    querySnapshot.forEach(function(snapshot){
      let snapshotData = snapshot.data();
      snapshotData['id'] = snapshot.id;
      snapshotData['key'] = counter++;
      dataList.push(snapshotData);
    });
    for(let snapshotData of dataList){
      var temp = null;
      temp = await getDataFromReference(snapshotData.guru);
      snapshotData['guru'] = temp.username;
      temp = await getDataFromReference(snapshotData.kelas);
      snapshotData['kelas'] = temp.value;
      temp = [];
      for(const murid of snapshotData.murid){
        let muridData = await getDataFromReference(murid);
        temp.push(muridData);
      }
      snapshotData['murid'] = Util.arrayToString(temp,Util.SISWA);

      temp = [];
      for(const mapel of snapshotData.mapel){
        let mapelData = await getDataFromReference(mapel);
        temp.push(mapelData);
      }
      snapshotData['mapel'] = Util.arrayToString(temp,Util.MAPEL);
    }
    dataList.sort((a, b) => (a.key < b.key ? -1 : 1));
    return dataList;
}

async function getDataFromReference(ref){
  let snapshot = null;
  snapshot = await ref.get();
  return snapshot.data();
}

export async function firebaseQueryCollection(collectionName){
  const querySnapshot = await db.collection(collectionName).get();
  let dataList=[];
  querySnapshot.forEach(function(snapshot){
    let snapshotData = snapshot.data();
    snapshotData['id'] = snapshot.id;
    dataList.push(snapshotData);
  });
  dataList.sort((a, b) => (a.key < b.key ? -1 : 1));
  return dataList;
}

//================================== Registration ===================================
export async function firebaseCheckPhoneExist(phoneVal){
  //check apakah sudah ada user dg no.hp yang sama
  try{
    const guruList = await db.collection('guru').get();
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
    await db.collection('guru').doc(action.mailVal).set({
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
  let mapelRefs = [];
  let siswaRefs = [];
  var ref=null;
  for(let mapel of action.mapelPilihan){
    ref = db.doc('master_mapel/' + mapel.id);
    mapelRefs.push(ref);
  }
  for(let siswa of action.siswaPilihan){
    ref = db.doc('murid/' + siswa.id);
    siswaRefs.push(ref);
  }

  ref = await db.collection('detail_sesi').add({
    pertemuan:'registered'
  }); //reference untuk detil sesi
  await db.collection('sesi').add({
    guru: db.doc('guru/' + action.guruPilihan),
    kelas: db.doc('master_kelas/' + action.kelasPilihan),
    mapel: mapelRefs,
    murid: siswaRefs,
    nama_sesi: action.courseName,
    tanggal_mulai: firebase.firestore.FieldValue.serverTimestamp(),
    detail_sesi: ref
  });
  
  return OK;
}

export async function firebaseQueryCourseDetail(docRef){
  console.log('docref = '+JSON.stringify(docRef));
  let data = await getDataFromReference(docRef);
  return data;
}

export async function firebaseDeleteSession(id){
    await db.collection('sesi').doc(id).delete();
    return OK;
}

// function getCurrentDate(){
//   const today = new Date();
//   const dd = today.getDate();
//   const mm = today.getMonth()+1; //As January is 0.
//   const yyyy = today.getFullYear();
//   return (dd + '/' + mm + '/' + yyyy);
// }
