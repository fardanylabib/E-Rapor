
 import * as Util from './Util';

const initialState = {
    //user auth state
    isUser:false,
    isAdmin:false,
    email:'',
    notRegistering:false,
    loading:Util.STATUS_IDLE,

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
    doc:{},

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
    selectedMurid:[],
    sessionStep:0,

    //data-data course
    openEditor:false,
    selectedCourse:null,
    courseBundle:[],
    courseDtlQueried:false
}

function reducer(state = initialState, action){
    switch (action.type){
        case 'SIGN_IN':
        case 'SIGN_OUT':
        case 'REGISTER':
        case 'COURSES':   
            return {
                ...state,
                loading:Util.STATUS_LOADING
            }
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
                messageContent : action.content,
                loading:Util.STATUS_LOADING_DONE
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
                loading:Util.STATUS_LOADING_DONE
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
            console.log('doc id popup = '+action.doc.id)
            return{
                ...state,
                popupOpen: action.popupOpen,
                popupTitle: action.popupTitle,
                popupOptions1: action.popupOptions1,
                popupOptions2: action.popupOptions2,
                popupContent: action.popupContent,
                doc: action.doc
            }
        case 'POPUP_CANCEL':
            return{
                ...state,
                popupOpen: false,
            }
        case 'OPEN_EDITOR':
            return{
                ...state,
                openEditor: true,
                courseDtlQueried: false,
                sessionStep:0
            }
        case 'CLOSE_EDITOR':
            return{
                ...state,
                openEditor: false,
            }
        case 'COURSE':
            console.log('Course Bundlenya : '+JSON.stringify(action.courseBundle))
            return{
                ...state,
                courseBundle: action.courseBundle,
                courseDtlQueried: true,
            }
        case 'COURSE_ID':
            return{
                ...state,
                selectedCourse: action.courseId
            } 
        case 'NEXT_STEP':
            {
                const newState = {...state};
                newState.sessionStep += 1;
                return newState;
            }
        case 'PREV_STEP':
            {
                const newState = {...state};
                newState.sessionStep -= 1;
                return newState; 
            }
        case 'BUTTON_2':
            return{
                ...state,
                popupOptions2: action.popupOptions2,
                popupTitle: action.optionTitle
            }        
        default:
          return state;
    }
}

export default reducer;