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

export function handleRegister(mailVal,passVal,nameVal,phoneVal,addrVal,instVal){
    console.log('user registration');
    return{
        type: 'REGISTER',
        mailVal,
        passVal,
        nameVal,
        phoneVal,
        addrVal,
        instVal
    }
}

export function openMessage(variation,content){
    console.log('open message');
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

export function queryCourseList(isAdmin,email){
    return{
        type: 'COURSES',
        isAdmin,
        email
    }
}

export function queryGuru(){
    return{
        type: 'TEACHERS'
    }
}

export function querySiswa(){
    return{
        type: 'STUDENTS'
    } 
}

export function queryMapel(){
    return{
        type: 'SUBJECTS'
    }
}

export function queryKelas(){
    return{
        type: 'CLASS'
    }
}

export function handlePopup(popupOpen,popupTitle,popupOptions1,popupOptions2,popupContent){
    return{
        type:'POPUP',
        popupOpen,
        popupTitle,
        popupOptions1,
        popupOptions2,
        popupContent,
    }
}