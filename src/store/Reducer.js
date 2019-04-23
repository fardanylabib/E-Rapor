const initialState = {
    //user auth state
    isUser:false,
    isAdmin:false,
    //messages
    messageOpen: false,
    messageVariation:"success",
    messageContent:"",
    queried:false,
}

function reducer(state = initialState, action){
    switch (action.type){
        case 'SIGN_IN':
        case 'SIGN_OUT':
            return {
                ...state,
                loading: true
            }
        case 'USER_LOGIN':
            if(action.login){
                return {
                    ...state,
                    isUser: true,
                    isAdmin:action.isAdmin
                }
            }
            return {
              ...state,
              isUser: false
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
        default:
          return state;
    }
}

export default reducer;