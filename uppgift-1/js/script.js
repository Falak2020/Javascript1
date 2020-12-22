
let usersList = []
const firstName = document.querySelector('#firstName');
const lasName = document.querySelector('#lastName');
// const id = document.querySelector('#userId');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('#submitBtn');
const output = document.querySelector('#users');
const result = document.querySelector('#result')
const firstNameError = document.querySelector('#firstNameError')
const lastNameError = document.querySelector('#lastNameError')
const emailError = document.querySelector('#emailError')
const idError = document.querySelector('#idError')
const deletBtn = document.querySelector('#deleteBtn')
const edit = document.querySelector('#editBtn')

const displayUsers = () => {
    output.innerHTML = ''
    usersList.forEach(user => {
        output.innerHTML+=`<div  id="${user.Id}"class="bg-white border rounded p-2 d-flex justify-content-between align-items-center mt-1"><div><div class="displayName">${user.FirstName} ${user.LastName}</div><div class="emailStyle">${user.Email} </div></div><div><button class="btn btn-danger px-3">Delete</button><button  class="btn btn-success px-3 ms-4">Edit</button></div></div>`
    })
}
function ValidateEmail(string){
    if(string.includes('ä')||string.includes('å') ||string.includes('ö'))
    return true
    else
    return false
}

function Validateform(){
    if (firstName.value !== '' && lasName.value !== ''  && email.value !== '') {
        if (firstName.value.length >= 3 && lasName.value.length >= 3 && !ValidateEmail(email.value)) {
            firstName.classList.remove('is-invalid')
            lastName.classList.remove('is-invalid')
            // id.classList.remove('is-invalid')
            email.classList.remove('is-invalid')
            let newUser = {
                Id: Date.now().toString(),
                FirstName: firstName.value,
                LastName: lastName.value,
                Email: email.value
            }
            console.log(usersList.length)
            if(submitBtn.textContent=='Save'){
               let myindex=usersList.indexOf(newUser)
                usersList.splice(myindex,1,newUser)
                }
            
            else
            usersList.push(newUser)
           /*  if(usersList.length===0){
                usersList.push(newUser);
            }else {
                for(let i=0;i<usersList.length;i++){
                    if(usersList[i].Id===newUser.Id)
                    {
                        usersList.splice(i,1,newUser)
                    }
                    else{
                        usersList.push(newUser); 
                    }
                } 
            } */
            console.log(usersList)
            displayUsers()
            firstName.value = ''
            lastName.value = ''
            // id.value = ''
            email.value = ''
            firstNameError.innerHTML = ''
            lastNameError.innerHTML = ''
            emailError.innerHTML = ''
            // idError.innerHTML = ''
        } else if (firstName.value.length < 3) {
            firstName.classList.add('is-invalid')
            firstNameError.innerHTML = '<div class="error">The first name must be more than 2 char</div>'
            firstName.value = ''
        } else if (lastName.value.length < 3) {
            lastName.classList.add('is-invalid')
            lastNameError.innerHTML = '<div class="error">The last name must be more than 2 char</div>'
            lastName.value = ''
        }else{
            emailError.innerHTML='<div class="error">The email should not contain ä,å,ö</div>'
            email.value=''
        }

    }
    else if (firstName.value === '') {
        firstName.classList.add('is-invalid')
        firstNameError.innerHTML = '<div class="error">please fill out this field</div>'
    }
    else if (lastName.value === '') {
        lastName.classList.add('is-invalid')
        lastNameError.innerHTML = '<div class="error">please fill out this field</div>'
    }
   /*  else if (id.value === '') {
        id.classList.add('is-invalid')
        idError.innerHTML = '<div class="error">please fill out this field</div>'
    } */
    else if (email.value === '') {
        email.classList.add('is-invalid')
        emailError.innerHTML = '<div class="error">please fill out this field</div>'
    }
}
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(submitBtn.textContent==='Submit'){
    Validateform()
    }else if(submitBtn.textContent==='Save'){
        Validateform()
        submitBtn.textContent='Submit'

    }
    
})

output.addEventListener('click',(e)=>{
   const button=e.target
   if(button.textContent==='Delete'){
    usersList = usersList.filter(user => user.Id !== e.target.parentNode.parentNode.id)
    displayUsers()
   }
   else if(button.textContent==='Edit'){

       usersList.forEach(user=>{
    if(user.Id===e.target.parentNode.parentNode.id){
       firstName.value=user.FirstName
       lastName.value=user.LastName
       email.value=user.Email
       let index=usersList.indexOf(user)
       displayUsers()
       submitBtn.textContent='Save'
    } })  
   }
    
}) 
  
displayUsers()
