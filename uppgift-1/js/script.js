
let usersList = []
const formId = document.querySelector('#formId')
const firstName = document.querySelector('#firstName')
const lasName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const submitBtn = document.querySelector('#submitBtn')
const output = document.querySelector('#users')
const result = document.querySelector('#result')
const firstNameError = document.querySelector('#firstNameError')
const lastNameError = document.querySelector('#lastNameError')
const emailError = document.querySelector('#emailError')
const idError = document.querySelector('#idError')
const deletBtn = document.querySelector('#deleteBtn')
const edit = document.querySelector('#editBtn')
const userError = document.querySelector('#userError')

const displayUsers = () => {
    output.innerHTML = ''
    usersList.forEach(user => {
        output.innerHTML += `<div  id="${user.Id}"class="bg-white border rounded p-2 d-flex justify-content-between align-items-center mt-1"><div><div class="displayName">${user.FirstName} ${user.LastName}</div><div class="emailStyle"><a href="#">${user.Email}</a> </div></div><div><button class="btn btn-danger px-3">Delete</button><button  class="btn btn-info px-3 ms-4">Edit</button></div></div>`
    })
}
//The email should not have ä,å,ö 
function ValidateEmail(string) {
    if (!(string.includes('ä')) && !(string.includes('å')) && !(string.includes('ö'))&&(string.indexOf('@')>0)){
        if ((string.charAt(string.length-4)!='.') && (string.charAt(string.length-3)!='.')) {
            return false;
        } else return true
    }else return false  
    
}
// Two users must not have the same email
function ValidateUser(newUserEmail) {
    for (let j = 0; j < usersList.length; j++) {
        if(submitBtn.textContent==='Submit')
        {
            if ( usersList[j].Email === newUserEmail)
            return true
        else
            return false
        }else
        return false  
    }
}
function Validateform() {
    if (firstName.value !== '' && lasName.value !== '' && email.value !== '') {
        if (firstName.value.length >= 3 && lasName.value.length >= 3 && ValidateEmail(email.value) && !ValidateUser(email.value)) {
            firstName.classList.remove('is-invalid')
            lastName.classList.remove('is-invalid')
            email.classList.remove('is-invalid')
            console.log(firstName.value.charAt(0).toUpperCase()+firstName.value.substring(1))
            let newUser = {
                Id: Date.now().toString(),
                FirstName: firstName.value.charAt(0).toUpperCase()+firstName.value.substring(1),
                LastName: lastName.value.charAt(0).toUpperCase()+lastName.value.substring(1),
                Email: email.value
            }
           
            if (submitBtn.textContent == 'Save') {
                const inputid = document.getElementById('#idInput')
                const labelId = document.getElementById('#labelId')
                for (let i = 0; i < usersList.length; i++) {
                    if (usersList[i].Id === inputid.value) {
                        newUser.Id=inputid.value///Because I do not want new id I will take the old one
                        usersList.splice(i, 1, newUser)
                    }
                }
                inputid.remove()
                labelId.remove()
            }

            else
                usersList.push(newUser)
            displayUsers()
            firstName.value = ''
            lastName.value = ''
            email.value = ''
            firstNameError.innerHTML = ''
            lastNameError.innerHTML = ''
            emailError.innerHTML = ''
            userError.innerHTML = ''
        } else if (firstName.value.length < 3) {
            firstName.classList.add('is-invalid')
            firstNameError.innerHTML = '<div class="text-danger error">The first name must be more than 2 character</div>'
            firstName.value = ''
        } else if (lastName.value.length < 3) {
            lastName.classList.add('is-invalid')
            lastNameError.innerHTML = '<div class="text-danger error">The last name must be more than 2 character</div>'
            lastName.value = ''
        } else if (!ValidateEmail(email.value)) {
            emailError.innerHTML = '<div class="text-danger error">The email is not valid</div>'
            email.value = ''
        } else {
            userError.innerHTML = '<div class="text-danger error">The user is already existed</div>'

        }

    }
    else if (firstName.value === '') {
        firstName.classList.add('is-invalid')
        firstNameError.innerHTML = '<div class="text-danger error">please fill out this field</div>'
    } else if (lastName.value === '') {
        lastName.classList.add('is-invalid')
        lastNameError.innerHTML = '<div class="text-danger error">please fill out this field</div>'
    } else if (email.value === '') {
        email.classList.add('is-invalid')
        emailError.innerHTML = '<div class="text-danger error">please fill out this field</div>'
    }
}
// Adding users to the list
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (submitBtn.textContent === 'Submit') {
        Validateform()
    } else if (submitBtn.textContent === 'Save') {
        Validateform()
        submitBtn.textContent = 'Submit'

    }

})
// Delete user from the list or change the information of the user
output.addEventListener('click', (e) => {
    const button = e.target
    if (button.textContent === 'Delete') {
        usersList = usersList.filter(user => user.Id !== e.target.parentNode.parentNode.id)
        displayUsers()
    }
    else if (button.textContent === 'Edit') {
        usersList.forEach(user => {
            if (user.Id === e.target.parentNode.parentNode.id) {
                firstName.value = user.FirstName
                lastName.value = user.LastName
                email.value = user.Email
                let index = usersList.indexOf(user)
                const label = document.createElement('label')
                label.id = '#labelId'
                label.classList="me-3"
                label.innerHTML = "Id"
                const input = document.createElement('input')
                input.type = 'text'
                input.id = '#idInput'
                input.readOnly = true
                input.value = user.Id
                formId.appendChild(label)
                formId.appendChild(input)
                displayUsers()
                submitBtn.textContent = 'Save' 
            }
        })
    }

})

displayUsers()
