const initialState = {
    //user auth state
    isUser:false,
    isAdmin:false,
    email:'',
    notRegistering:false,

    //messages
    messageOpen: false,
    messageVariation:'success',
    messageContent:'',

    //popups
    popupOpen:false,
    popupTitle:'',
    popupOptions1:'',
    popupOptions2:'',
    popupContent:'',
    docId:'',

    //dashboard states
    rows: [],
    guru: [],
    siswa: [],
    kelas: [],
    mapel: [],

    //states for add course
    courseName:'',
    selectedClass:'',
    selectedGuru:'',
    selectedMapel:[],
    selectedMurid:[]
}

function reducer(state = initialState, action){
    switch (action.type){
        case 'SIGN_IN':
        case 'SIGN_OUT':
        case 'REGISTER':   
            return state;
            // return {
            //     ...state,
            //     loading: true
            // }
        case 'USER_LOGIN':
            if(action.login){
                return {
                    ...state,
                    isUser: true,
                    isAdmin:action.isAdmin,
                    email:action.email
                }
            }
            return {
              ...state,
              isUser: false,
              isAdmin: false,
              email:''
            }
        case 'MESSAGE':
            return {
                ...state,
                messageOpen: true,
                messageVariation : action.variation,
                messageContent : action.content
            }
        case 'CLOSE_MSG':
            console.log('close message');
            return{
                ...state,
                messageOpen: false,
            }
        case 'DASHBOARD_DATA':
            console.log('dashboard query done');
            return{
                ...state,
                rows: action.rows,
            }
        case 'GURU_DATA':
            console.log('teacher query done');
            return{
                ...state,
                guru: action.guru,
                guruQueried:true
            }
        case 'STUDENT_DATA':
            console.log('teacher query done');
            return{
                ...state,
                siswa: action.siswa,
                siswaQueried:true
            }
        case 'CLASS_DATA':
            console.log('teacher query done');
            return{
                ...state,
                kelas: action.kelas,
                kelasQueried: true
            }  
        case 'MAPEL_DATA':
            console.log('teacher query done');
            return{
                ...state,
                mapel: action.mapel,
                mapelQueried: true
            }      
        case 'REG_SUCCESS':
            console.log('REGISTER SUCCESS');
            return{
                ...state,
                notRegistering: action.notRegistering,
            }
        case 'POPUP':
            return{
                ...state,
                popupOpen: action.popupOpen,
                popupTitle: action.popupTitle,
                popupOptions1: action.popupOptions1,
                popupOptions2: action.popupOptions2,
                popupContent: action.popupContent,
                docId: action.docId
            }
        case 'POPUP_CANCEL':
            return{
                ...state,
                popupOpen: false,
            }
        default:
          return state;
    }
}

export default reducer;