const form = document.querySelector('#formId');
const input = document.querySelector('#inputId');
const output = document.querySelector('#output');
const error = document.querySelector('#error')
let todosArray = [];
const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos??_start=0&_limit=10')
    const data = await res.json()
    todosArray = data
    listTodos(todosArray);
}

fetchTodos();
// create new card
const newTodo = (todo) => {
    let card = document.createElement('div');
    card.id = todo.id
    card.classList.add('card', 'p-4', 'my-3', 'shadow-lg', 'positionCard');
    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    let col1 = document.createElement('div');
    col1.classList.add();
    let checkInput = document.createElement('input')
    checkInput.type = 'checkbox'
    checkInput.classList.add('input-checkbox', 'form-check-input')
    let title = document.createElement('h3');
    title.classList.add('title', 'd-inline', 'ms-2');
    title.innerText = todo.title;
    // Draw line over todo which is completed and change their background

    // ***************************************************************
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-info', 'text-white');
    button.innerText = 'Delete';
    button.addEventListener('click', (e) => {
        let checked = e.target.parentNode.firstChild.firstChild.checked//Iwant to get check box if it is true or not
        text = e.target.parentNode.firstChild.lastChild.innerText
        if (checked) {
            todosArray = todosArray.filter(todo => (todo.id != e.target.parentNode.parentNode.id))
            listTodos(todosArray)
        }
        else {
            popUp(card)
        }
    })
    if (todo.completed) {
        checkInput.checked = true
        title.classList.add('line-throw')
        card.classList.add('bg-completed')
        button.classList.remove('btn-info')
        button.classList.add('btn-primary')
    }
    else {
        checkInput.checked = false
        title.classList.remove('line-throw')
        card.classList.remove('bg-completed')
        button.classList.add('btn-info')
        button.classList.remove('btn-primary')
    }
    col1.appendChild(checkInput)
    col1.appendChild(title)
    innerCard.appendChild(col1);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);
}
// Create pop up message
const popUp = (card) => {
    let popText = document.createElement('div')
    popText.classList.add('card', 'text', 'text-danger', 'bg-warning')
    let buttonOk = document.createElement('button');
    buttonOk.classList.add('btn', 'btn-success', 'py-2', 'text-center');
    buttonOk.textContent = 'OK'
    popText.innerText = 'Not completed you can not delete this todo'
    popText.appendChild(buttonOk)
    card.appendChild(popText)
    buttonOk.addEventListener('click', (e) => {
        popText.classList.add('d-none')
    })

}
//View the list of todos
const listTodos = (todosArray) => {
    output.innerHTML = '';
    todosArray.forEach(todo => {
        newTodo(todo);
    })
}

const createTodo = (todoTitle) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: todoTitle,
            completed: false,

        })
    })
        .then(res => res.json())
        .then(data => {
            todosArray.unshift(data);
            listTodos(todosArray);
        })
}

//I do not want to repeat the same title 
const todoTitleUniq = (input) => {
    let uniq = true
    todosArray.forEach(todo => {
        if (todo.title === input.value) {
            uniq = false
        }
    })
    return uniq
}

// Validate input

const validateInput = (input) => {
    if (input.value === '') {
        input.classList.add('is-invalid')
        error.innerHTML = 'Please write something in the field'
        return false
    }
    else {
        if (todoTitleUniq(input)) {
            error.innerHTML = ''
            input.classList.remove('is-invalid')
            return true
        }
        else {
            error.innerHTML = 'There is another todo which has the same title'
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
    }

})

output.addEventListener('click', e => {

    if (e.target.type === 'checkbox') {

        let checkedTodo = e.target.parentNode.parentNode.parentNode
        let deleteBtn = e.target.parentNode.nextSibling
        if (e.target.checked) {
            todosArray.forEach(todo => {
                if (todo.id == checkedTodo.id) {
                    todo.completed = true
                    checkedTodo.classList.remove('bg-white')
                    e.target.parentNode.lastChild.classList.add('line-throw')
                    checkedTodo.classList.add('bg-completed')
                    deleteBtn.classList.remove('btn-info')
                    deleteBtn.classList.add('btn-primary')
                }
            })
        }
        else if (!(e.target.checked)) {
            todosArray.forEach(todo => {
                if (todo.id == checkedTodo.id) {
                    todo.completed = false
                    e.target.parentNode.lastChild.classList.remove('line-throw')
                    checkedTodo.classList.remove('bg-completed')
                    checkedTodo.classList.add('bg-white')
                    deleteBtn.classList.remove('btn-primary')
                    deleteBtn.classList.add('btn-info')
                }
            })
        }
    }

})






