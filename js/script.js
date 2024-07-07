const btnJson = document.querySelector('#btnJson')
btnJson.addEventListener('click', convert)

function convert() {
    try {
        errorMessageDell()
        outputString(getFormData())
    } catch(error) {
        errorMessageDell()
        errorMessage(error.message)
    }
}

const enterForm = document.querySelector('#enter')
function getFormData() {
    if(/^['"`].+['"`]$/gi.test(enterForm.value)) {
        return enterForm.value.substring(1, enterForm.value.length-1)
    } else {
        return enterForm.value
    }
}

let enterBlock = document.querySelector('#enterBlock')
function errorMessage(error) {
    let p = document.createElement('p')
    p.className = "error"
    p.id = "errorJson"
    p.textContent = `ОШИБКА: ${error}`
    enterBlock.prepend(p)
}

function errorMessageDell() {
    try {
        document.querySelector('#errorJson').remove()
    } catch {
    }
}

let formatted = document.querySelector('#formatted')
function outputString(json) {
    // не могу сообразить как вывести JSON.parse(json)  на экран в формате как в задании
    let rezJson = JSON.parse(json)
    console.log(rezJson)
    for(let key in rezJson) {
        console.log(key)
        console.log(rezJson[key])
    }
    formatted.value = rezJson
}

// пример JSON  '{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male"}'







/////Задание 2////////////////////////////////

fetch('https://jsonplaceholder.typicode.com/users', {method: 'GET'}
).then((data) => {
    return data.json()
}).then((arrUsers) => {
    showUsers(arrUsers)
    addHtmlUsers(arrUsers)
})


function showUsers(arrUsers) {
    console.log(arrUsers)
}

const users = document.querySelector('#users')
function addHtmlUsers(arrUsers) {
    arrUsers.forEach((el) => {
        let div = document.createElement('div')
        let p =  document.createElement('p')
        div.className = 'user' 
        div.setAttribute('data-id', el.id);
        users.append(div)
        p.textContent = el.name
        div.append(p)
    })
}

users.addEventListener('click', showInformation )
function showInformation(event) {
    if(!event.target.closest('div')) {
        return
    } 
    
    console.log(event.target)    // отловить элемент DIV при клике на p
    
}















