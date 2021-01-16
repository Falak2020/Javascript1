

// Variables
let usersList = [] 
let array=[]
const formId = document.querySelector('#formId')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const submitBtn = document.querySelector('#submitBtn')
const output = document.querySelector('#users')
const firstNameError = document.querySelector('#firstNameError')
const lastNameError = document.querySelector('#lastNameError')
const emailError = document.querySelector('#emailError')
const userError = document.querySelector('#userError')

// Functions 
onload=()=>{ 
    usersList = JSON.parse(localStorage.getItem("array"));
    if(usersList!=null)
    {
    displayUsers()  
    }
    else 
    usersList=[]     
}

const displayUsers = () => {
    output.innerHTML = ''
    usersList.forEach(user => {
        output.innerHTML += `<div  id="${user.Id}"class="bg-white border rounded p-2 d-flex justify-content-between align-items-center mt-1"><div><div class="displayName">${user.FirstName} ${user.LastName}</div><div class="emailStyle"><a href="mailto:${user.Email}">${user.Email}</a> </div></div><div><button class="btn btn-danger px-3">Delete</button><button  class="btn btn-info px-3 ms-4">Edit</button></div></div>`
    })
}
//The email should not have ä,å,ö 
function ValidateEmail(string) {
    if(string===''){
        email.classList.add('is-invalid')
        emailError.innerHTML = '<div class="text-danger error">Please fill out this field</div>'
        return false
    }
    if (!(string.includes('ä')) && !(string.includes('å')) && !(string.includes('ö')) && (string.indexOf('@') > 0)) {
        if ((string.charAt(string.length - 4) != '.') && (string.charAt(string.length - 3) != '.')) {
            email.classList.add('is-invalid')
            emailError.innerHTML = '<div class="text-danger error">The email is not valid</div>'
            return false
        }
        else{
            email.classList.remove('is-invalid')
            emailError.innerHTML=''
            return true
        }    
    }
    else{
        email.classList.add('is-invalid')
        emailError.innerHTML = '<div class="text-danger error">The email is not valid</div>'
        return false
    }
    
}
// Two users must not have the same email
function ValidateUser(newUserEmail) {
    let userExisted = false
    if (submitBtn.textContent === 'Submit') {
        usersList.forEach(user => {
            if (user.Email === newUserEmail)
                userExisted = true
        })
        if (userExisted === true){
            userError.innerHTML = '<div class="text-danger error">The user is already exists</div>'
            return false
        } 
        else{
            userError.innerHTML=''
            return true
        } 
    }
    else if (submitBtn.textContent === 'Save')
        return true
}


// -----------------------------------------------------
const ValidateFirstName=(firstName)=>{
    if(firstName.value!=='' && firstName.value.length>=3){
        firstName.classList.remove('is-invalid')
        firstNameError.innerHTML=''
        return true
    }
   
    else if(firstName.value===''){
        firstName.classList.add('is-invalid')
        firstNameError.innerHTML = '<div class="text-danger error">please fill out this field</div>'
        return false
    }
    else if(firstName.value.length<3){
        firstName.classList.add('is-invalid')
        firstNameError.innerHTML = '<div class="text-danger error">The first name must be more than 2 character</div>'
        firstName.value = ''
        return false
    }
}
// -----------------------------------------------------
const ValidateLastName=(lastName)=>{
    if(lastName.value!=='' && lastName.value.length>=3){
        lastName.classList.remove('is-invalid')
        lastNameError.innerHTML=''
        return true 
    }
    else if(lastName.value===''){
        lastName.classList.add('is-invalid')
        lastNameError.innerHTML = '<div class="text-danger error">please fill out this field</div>'
        return false
    }
    else if(lastName.value.length<3){
        lastName.classList.add('is-invalid')
        lastNameError.innerHTML = '<div class="text-danger error">The last name must be more than 2 character</div>'
        lastName.value = ''
        return false
    }
}
// Create new user or make change on existed user

const createUser=(firstName,lastName,email)=>{
    let newUser = {
        Id: Date.now().toString(),
        FirstName: firstName.value.charAt(0).toUpperCase() + firstName.value.substring(1),
        LastName: lastName.value.charAt(0).toUpperCase() + lastName.value.substring(1),
        Email: email.value
    }
    if (submitBtn.textContent === 'Save') {
        const oldId = localStorage.getItem('editId')
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].Id === oldId) {
                newUser.Id = oldId///Because I do not want new id I will take the old one
                usersList.splice(i, 1, newUser)
            }
        }
        localStorage.removeItem('editId')
        submitBtn.textContent = 'Submit'
    }
    else {
        usersList.push(newUser)
    }
}
// 
// Submit Button Validate the all information and save the user list in a local storage
submitBtn.addEventListener('click', (e) => {
    e.preventDefault() 
    if (ValidateFirstName(firstName)&& ValidateLastName(lastName) && ValidateEmail(email.value) && ValidateUser(email.value)) {
        email.classList.remove('is-invalid')
        createUser(firstName,lastName,email)
        localStorage.setItem("array", JSON.stringify(usersList)); 
        displayUsers()
        formId.reset()
     } 
})

// Delete or edit
output.addEventListener('click', (e) => {
    const button = e.target
    // Delete user from the list or change the information of the user
    if (button.textContent === 'Delete') {
        usersList = usersList.filter(user => user.Id !== e.target.parentNode.parentNode.id)
        localStorage.removeItem('array')
        localStorage.setItem("array", JSON.stringify(usersList));
        displayUsers()
    }
    //Edit user in the list
    else if (button.textContent === 'Edit') {
        usersList.forEach(user => {
            if (user.Id === e.target.parentNode.parentNode.id) {
                firstName.value = user.FirstName
                lastName.value = user.LastName
                email.value = user.Email
                localStorage.setItem('editId', user.Id)
                submitBtn.textContent = 'Save'
                button.textContent = 'Ignore'
                button.classList = 'btn  px-3 ms-4 btn-success'
            }
        })
    }
    //Ignore editing and come back to the first state
    else if (button.textContent === 'Ignore') {
        button.textContent = 'Edit'
        button.classList = 'btn px-3 ms-4 btn-info'
        submitBtn.textContent = 'Submit'
        firstName.value = ''
        lastName.value = ''
        email.value = ''
    }
})


