export function handleSignIn(email,passw) {
    console.log('SIGN IN WITH '+email+' '+passw);
    return{
        type: 'SIGN_IN',
        email,
        passw
    }
}

export function handleSignOut() {
    return{
        type: 'SIGN_OUT'
    }
}

export function openMessage(variation,content){
    return{
        type: 'MESSAGE',
        variation,
        content
    }
}

export function closeMessage() {
    return{
        type: 'CLOSE_MSG'
    }
}