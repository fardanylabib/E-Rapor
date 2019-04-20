const initialState = {
    //user auth state
    isUser:false,
    
    //messages
    messageOpen: false,
    messageVariation:"success",
    messageContent:""
}

async function reducer(state = initialState, action){
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
                    isUser: true
                }
            }
            return {
              ...state,
              isUser: false
            }
        case 'MESSAGE':
            // newState.messageOpen = true;
            // newState.messageVariation = action.value1;
            // newState.messageContent = action.value2;
            break; 
        default:
          return state;
    }
}

export default reducer;