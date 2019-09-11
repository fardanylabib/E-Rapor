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

export function tambahSesi(courseName,guruPilihan,siswaPilihan,kelasPilihan,mapelPilihan){
    return{
        type: 'NEW_SESSION',
        courseName,guruPilihan,siswaPilihan,kelasPilihan,mapelPilihan
    }
}

export function simpanSesi(dataPertemuan,detailSesiRef){
    return{
        type: 'SAVE_SESSION',
        dataPertemuan,
        detailSesiRef
    }
}

export function closeEditor(){
    return{
        type: 'CLOSE_EDITOR'
    }
}

export function handlePopup(popupOpen,popupTitle,popupOptions1,popupOptions2,popupContent,doc){
    return{
        type:'POPUP',
        popupOpen,
        popupTitle,
        popupOptions1,
        popupOptions2,
        popupContent,
        doc
    }
}

export function handlePopupCancel(coba){
    return{
        type:'POPUP_CANCEL',
    }
}

export function handleOptions1(popupOptions1,doc,email,isAdmin){
    return{
        type:'BUTTON_1',
        popupOptions1,
        doc,
        email,
        isAdmin
    }
}

export function handleOptions2(popupOptions2,optionTitle){
    return{
        type:'BUTTON_2',
        popupOptions2,
        optionTitle,
    }
}

export function queryCourseDetail(docRef){
    console.log('query by id: '+docRef)
    return{
        type:'COURSE_DETAIL',
        docRef
    }
}

export function setSelectedCourseId(courseId){
    console.log('COURSE id: '+courseId)
    return{
        type:'COURSE_ID',
        courseId
    }
}

export function nextStep(){
    return{
        type: 'NEXT_STEP',
    }
}


export function prevStep(){
    return{
        type: 'PREV_STEP',
    }
}