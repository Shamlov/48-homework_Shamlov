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

let currentUserId = undefined   // текущий id. запишется при первом клике на прользвателя

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

users.addEventListener('click', getAdditionalUserInformation )
function getAdditionalUserInformation(event) {
    if(!event.target.closest('div')) {
        return
    } 
    currentUserId = +event.target.closest('div').dataset.id
    fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`, {method: 'GET'}
    ).then((data) => {
        return data.json()
    }).then((user) => {
        showAdditionalInformation(user)
    })
    cleenPost()
}

function showAdditionalInformation(user) {
    // так как поля и выводимой информациий известны, не буду создавать каждый элемент отдельно а запишу в el.innerHTML
    console.log(user);
    let userInfo = document.querySelector('#userInfo');
    userInfo.innerHTML = `
    <p>Подробная информацияя о пользователе</p>
        <table>
            <tbody>
                <tr>
                    <td>Имя</td>
                    <td>${user.name}</td>
                </tr>
                <tr>
                    <td>Ник</td>
                    <td>${user.username}</td>
                </tr>
                <tr>
                    <td>Адрес</td>
                    <td>${user.address.city}, ${user.address.street}, ${user.address.suite}</td>
                </tr>
                <tr>
                    <td>Почта</td>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <td>Телефон</td>
                    <td>${user.phone}</td>
                </tr>
                <tr>
                    <td>WEB-сайт</td>
                    <td>${user.website}</td>
                </tr>
            </tbody>
        </table>
    <button>показать посты пользователя</button>
    `;

    let btnInfo = userInfo.querySelector('button') // когда код уже существует. найдем кнопку
    btnInfo.addEventListener('click', getPosts)
}

function getPosts() { 
    // т.к. при выполнении данной функции id уже при любом исходе существует и записан во внешней перемноой. забираем его оттуда
    fetch(`https://jsonplaceholder.typicode.com/posts/${currentUserId}`, {method: 'GET'}
    ).then((data) => {
        return data.json()
    }).then((post) => {
        showPosts(post)
    })
}
let usersPosts = document.querySelector('#usersPosts')
function showPosts(post) {
    
    // так понимаю по одному посту у каждого пользователя. и ответ сформирован так , что перебирать объект сложно для меня. я покажу 1 пост 
    usersPosts.innerHTML = `
    <p>посты пользователя</p>
    <div class="post">
        <p>${post.title}</p>
        <p>${post.body}</p>
    </div>
    `
}

function cleenPost() {
    usersPosts.innerHTML = ''
}










