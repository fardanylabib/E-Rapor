import firebase from '../FirebaseConfig';

const initialState = {
    //user auth state
    isUser:false,
    
    //drawer state
    drawerOpen: false,

    //messages
    messageOpen: false,
    messageVariation:"success",
    messageContent:""
}

async function firebaseSignIn(mail,pass){
  console.log("SIGN-IN "+mail+" "+pass);
  firebase.auth().signInWithEmailAndPassword(mail, pass)
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " | "+errorMessage);
  });
}

async function firebaseSignOut(){
  firebase.auth().signOut().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " | "+errorMessage);
  });
}

async function reducer(state = initialState, action){
    switch (action.type){
        case 'SIGNIN':
            await firebaseSignIn(action.email,action.passw);
            if(firebase.auth().currentUser.emailVerified){
              console.log("login sucess hee");
              return {
                ...state,
                isUser: true
              }
            }else{
              console.log("email belum diverifikasi");
              return {
                ...state,
                isUser: false
              }
            };
        case 'SIGNOUT':
            await firebaseSignOut();
            if(!firebase.auth().currentUser){
              console.log("sign out sucess hee");
              return {
                ...state,
                isUser: false
              }
            }else{
              console.log("sign out gagal hee");
            };
            break;
        case 'MESSAGE':
            // newState.messageOpen = true;
            // newState.messageVariation = action.value1;
            // newState.messageContent = action.value2;
            break; 
        default:
          
    }
}

export default reducer;