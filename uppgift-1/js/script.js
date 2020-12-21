const firstName = document.querySelector('#firstName');
const lasName = document.querySelector('#lastName');
const id = document.querySelector('#userId');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('#submitBtn');
const output = document.querySelector('#users');

let usersList=[]

const listUsers = () => {
    output.innerHTML = ''
  
    usersList.forEach(user => {
      output.innerHTML += `<div  id ="${user.Id} "class="bg-white border rounded p-2 d-flex justify-content-between align-items-center mt-1">
      <div> ${user.FirstName} ${user.LastName} </div>
      <div>
        <button class="btn btn-danger px-3">Delete</button> <button class="btn btn-green px-3">Edit</button>
      </div>
    </div>` 
    })
  }



submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
  
    if(firstName.value !== '' && lasName.value!=='' && id.value!=='' && email!=='') {
      let newUser = {
        Id:id.value,
        FirstName: firstName.value,
        LastName:lasName.value,
        Email:email.value
      }
  
      usersList.push(newUser);
      console.log(usersList)

      listUsers()
  
  
    } else {
      input.classList.add('is-invalid');
    }
  
  })

listUsers()
  