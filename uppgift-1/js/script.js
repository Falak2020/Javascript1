const firstName = document.querySelector('#firstName');
const lasName = document.querySelector('#lastName');
const id = document.querySelector('#userId');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('#submitBtn');
const output = document.querySelector('#users');
const result=document.querySelector('#result')

let usersList = []

const listUsers = () => {
    usersList.forEach(user => {
        output.innerHTML += `<div  id ="${user.Id} "class="bg-white border rounded p-2 d-flex justify-content-between align-items-center mt-1">
      <div> <div>${user.FirstName} ${user.LastName} </div> <div> ${user.Email}</div> </div>

      <div>
        <button class="btn btn-danger px-3">Delete</button> <button class="btn btn-green px-3">Edit</button>
      </div>
    </div>`
    })
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (firstName.value !== '' && lasName.value !== '' && id.value !== '' && email.value !== '') {
        if (firstName.value.length >= 3 && lasName.value.length>=3) {
            firstName.classList.remove('is-invalid')
            lastName.classList.remove('is-invalid')
            id.classList.remove('is-invalid')
            email.classList.remove('is-invalid')
            let newUser = {
                Id: id.value,
                FirstName: firstName.value,
                LastName: lasName.value,
                Email: email.value
            }
            usersList.push(newUser);
            listUsers()
            firstName.value = ''
            lastName.value = ''
            id.value = ''
            email.value = ''
        }else if(firstName.value.length<3){
            firstName.classList.add('is-invalid')
            result.innerHTML='The first name must be more than 2 char'
            firstName.value=''
        }else if(lastName.value.length<3){
            lastName.classList.add('is-invalid')
            result.innerHTML='The last name must be more than 2 char'
            lastName.value=''
        }

       
    }
    else if (firstName.value === '' ) {

        firstName.classList.add('is-invalid')

    }
    else if (lastName.value === '') {
        lastName.classList.add('is-invalid')
    }
    else if (id.value === '') {
        id.classList.add('is-invalid')
    }
    else if (email.value === '') {
        email.classList.add('is-invalid')
    }

})

console.log(usersList)

