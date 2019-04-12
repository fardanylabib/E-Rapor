export function handleSignIn(email,passw) {
    return{
        type: 'SIGNIN',
        email,
        passw
    }
}

export function handleSignOut() {
    return{
        type: 'SIGNOUT'
    }
}

export function closeMessage() {
    return{
        type: 'CLOSE_MSG'
    }
}