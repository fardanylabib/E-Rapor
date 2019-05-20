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
  try{
    let querySnapshot;
    let dashboardData=[];
    if(isAdmin){
      querySnapshot = await firebase.firestore().collection('sesi').get();
    }else{
      querySnapshot =  await firebase.firestore().collection('sesi').where('email','==',emailSearch).get();
    }
    if(querySnapshot){
      let sessionList=[];
      querySnapshot.forEach(function(snapshot){
        sessionList.push(snapshot);
      });
      for(let session of sessionList){
        const dataSesi = session.data();
        if(dataSesi){
          let mataPelajaran = '-';
          let dataGuru = null;
          let dataMurid = [];
  
          if(dataSesi.guru){
            dataGuru = await getDataFromReference(dataSesi.guru);
          }
          if(dataSesi.murid[0]){
            for(let murid of dataSesi.murid){
              let tempDataMurid = await getDataFromReference(murid);
              dataMurid.push(tempDataMurid);
            }
          }
  
          if(dataSesi.mapel[0]){
              mataPelajaran = '';
              let mapelLen = dataSesi.mapel.length;
              for(let i=0;i<mapelLen;i++){
                  if(i === mapelLen-1){
                      mataPelajaran += (''+dataSesi.mapel[i]);
                  }else{
                      mataPelajaran += (''+dataSesi.mapel[i]+', ');
                  }
              }
          }
          dashboardData.push(createData(dataSesi.nama_sesi, dataGuru, dataSesi.kelas, mataPelajaran, dataMurid));
        }
      }
      
      if(dashboardData.length>1){
        dashboardData.sort((a, b) => (a.sesi < b.sesi ? -1 : 1));
      }
      return dashboardData;
    }
    return null;
  }catch(error){
    throw new Error('Query Error '+error.code + ' | '+error.message);
  }
}

export async function firebaseQueryCollection(collectionName){
  const querySnapshot = await firebase.firestore().collection(collectionName).get();
  let dataList=[];
  querySnapshot.forEach(function(snapshot){
    dataList.push(snapshot.data());
  });
  dataList.sort((a, b) => (a.key < b.key ? -1 : 1));
  console.log('list datanya = '+JSON.stringify(dataList));
  return dataList;
}

function getDataFromReference(reference){
  return new Promise(function(resolve,reject){
    reference.get().then(function(sample){
      resolve(sample.data());
    }).catch(function(){
      reject('Kosong');
    });
  });
}

function createData(sesi, guru, kelas, mapel, murid) {
  const data = { id: counter, sesi, guru, kelas, mapel, murid};
  ++counter;
  return data;
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
      nama: action.nameVal,
      no_hp: action.phoneVal,
      alamat: action.addrVal,
      institusi: action.instVal
    });
    return OK;
  }catch(error){
    throw new Error(DATABASE_WRITE_FAILED);
  }
}
