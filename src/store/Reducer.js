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

    //dashboard states
    rows: [],
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
        case 'REG_SUCCESS':
            console.log('REGISTER SUCCESS');
            return{
                ...state,
                notRegistering: action.notRegistering,
            }
        case 'POPUP':
            return{
                ...state,
                popupOpen:action.open
            }
        default:
          return state;
    }
}

export default reducer;