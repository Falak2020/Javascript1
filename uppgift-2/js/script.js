// Variables
const form = document.querySelector('#formId')
const input = document.querySelector('#inputId')
const output = document.querySelector('#output')
const error = document.querySelector('#error')
const selectAll = document.querySelector('#select-all')
const todosNumbers = document.querySelector('#todos-numbers')
const deleteAll = document.querySelector('#deleteAll')
const url = 'https://jsonplaceholder.typicode.com/todos'
let todosArray = []
// ***************************
// Bring the data with index 1 and limit 10
const fetchData = () => {
    fetch(url + '?_start=0 &_limit=10')
        .then(response => response.json())
        .then(data => {
            todosArray = data
            listTodos(todosArray)
        })
        .catch((error) => {
            todosNumbers.innerText = error + ' could not get data '
        })
}

// call the function
fetchData()
// create new card
const newTodo = (todo) => {
    // create div1
    let card = document.createElement('div')
    card.id = todo.id
    card.classList.add('card', 'p-4', 'my-3', 'shadow-lg', 'positionCard')
    // create inner card div2
    let innerCard = document.createElement('div')
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center')
    // create checkbox och todos title div 3
    let firstElement = document.createElement('div');
    let checkInput = document.createElement('input')
    checkInput.type = 'checkbox'
    checkInput.classList.add('input-checkbox', 'form-check-input')
    let title = document.createElement('h3')
    title.classList.add('title', 'd-inline', 'ms-2')
    title.innerText = todo.title

    // create delete button
    let button = document.createElement('button')
    button.classList.add('btn', 'btn-light', 'text-dark', 'border')
    button.innerText = 'Delete'

    // When I click on delete button

    button.addEventListener('click', (e) => {
        let checked = e.target.parentNode.firstChild.firstChild.checked//Iwant to get check box if it is true or not
        let currentId = e.target.parentNode.parentNode.id

        if (checked) {
            todosArray = todosArray.filter(todo => (todo.id != currentId))
            listTodos(todosArray)
        }
        else {
            popUp(card)
        }
    })
    // Draw line over todo which is completed and change their background

    completedTodosStyle(todo, checkInput, title, card, button)

    // create my card 
    firstElement.appendChild(checkInput)
    firstElement.appendChild(title)
    innerCard.appendChild(firstElement);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);

    // ***************************************************************
}
// See if todo is completed and change its style
const completedTodosStyle = (todo, checkInput, title, card, button) => {
    if (todo.completed) {
        checkInput.checked = true
        checkInput.classList.add('bg-success')
        title.classList.add('line-throw')
        card.classList.add('bg-completed')
        button.classList.remove('btn-light')
        button.classList.add('btn-success', 'text-white')
    }
}

// Create pop up message
const popUp = (card) => {
    let popText = document.createElement('div')
    popText.classList.add('card', 'text', 'text-danger', 'bg-warning')
    let buttonOk = document.createElement('button');
    buttonOk.classList.add('btn', 'btn-success', 'py-2', 'text-center');
    buttonOk.textContent = 'OK'
    popText.innerText = 'Not completed you can not delete this task'
    popText.appendChild(buttonOk)
    card.appendChild(popText)
    buttonOk.addEventListener('click', (e) => {
        popText.classList.add('d-none')
    })
}

//View the list of todos
const listTodos = (todosArray) => {
    todosNumbers.innerText = `You have (${todosArray.length}) tasks in your list`
    output.innerHTML = ''
    todosArray.forEach(todo => {
        newTodo(todo)
    })
    completedAll(todosArray)
}

// create new todo
const createTodo = async (todoTitle) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: todoTitle,
                completed: false
            })
        })
        const data = await response.json()
        data.id = Date.now()
        todosArray.unshift(data)
        listTodos(todosArray)

    }
    catch (error) {
        todosNumbers.innerText = error+' could not send the data ' 
    }
}

//I do not want to repeat the same title 
const todoTitleUnique = (input) => {
    let unique = true
    todosArray.forEach(todo => {
        if (todo.title === input.value) {
            unique = false
        }
    })
    return unique
}

// Validate input

const validateInput = (input) => {
    if (input.value === '') {
        input.classList.add('is-invalid')
        error.innerHTML = 'Please write something in the field'
        return false
    }
    else {
        if (todoTitleUnique(input)) {
            error.innerHTML = ''
            input.classList.remove('is-invalid')
            return true
        }
        else {
            error.innerHTML = 'There is another todo which has the same title'
            input.classList.add('is-invalid')
            return false
        }
    }
}
// Send the information to database
form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInput(input)) {
        createTodo(input.value)
        input.value = ''
        input.focus()
    }
})

// Check in check out

output.addEventListener('click', e => {
    j = 1
    if (e.target.type === 'checkbox') {
        let checkedTodoId = e.target.parentNode.parentNode.parentNode.id
        // if (e.target.checked) {
        //     todosArray.forEach(todo => {
        //         if (todo.id == checkedTodoId) {
        //             todo.completed = true
        //         }
        //     })
        // }
        // else if (!(e.target.checked)) {
        //     todosArray.forEach(todo => {
        //         if (todo.id == checkedTodoId) {
        //             todo.completed = false
        //         }
        //     })
        // }
        todosArray.forEach(todo => {
            if (todo.id == checkedTodoId) {
                todo.completed = !todo.completed
            }
        })
        listTodos(todosArray)
    }
})

// ******************************************************'
let localArray = []
// ******************************************************

const checkAll = (todosArray) => {
    localStorage.setItem("localArray", JSON.stringify(todosArray));
    todosArray.forEach(todo => {
        todo.completed = true;
    })
    listTodos(todosArray)
}
selectAll.addEventListener('click', (e) => {
    if (e.target.type == 'checkbox') {
        if (e.target.checked) {
            checkAll(todosArray)
            deleteAll.classList.remove('btn-light', 'disabled')
            deleteAll.add('btn-success', 'active')
        }
        else if (!(e.target.checked)) {
            deleteAll.classList.add('btn-light', 'disabled')
            todosArray = JSON.parse(localStorage.getItem("localArray"));
            listTodos(todosArray)
        }
    }
    else {
        if (e.target.type == 'submit') {
            let checkedAll = e.target.parentNode.firstChild.nextElementSibling.firstChild.nextSibling
            if (e.target.classList.contains('active')) {
                todosArray = []
                listTodos(todosArray)
                checkedAll.checked = false
                e.target.classList.add('btn-light', 'disabled')
            }
        }
    }
})
// see if all todos are completed
const completedAll = (todosArray) => {
    let ok = true
    todosArray.forEach(todo => {
        if (todo.completed == false) {
            ok = false
        }

    })
    if (ok == true) {
        deleteAll.classList.remove('btn-light', 'disabled')
        deleteAll.classList.add('btn-success', 'active')
    }
    else {
        deleteAll.classList.remove('btn-success', 'active')
        deleteAll.classList.add('btn-light', 'disabled')

    }
}




