
console.log('%c Welcome to The Dog Show!', 'color: firebrick')
document.addEventListener('DOMContentLoaded', setupPage)


function updateDog (dog){
    event.preventDefault();
    dog.name = event.target.name.value
    dog.breed = event.target.breed.value
    dog.sex = event.target.sex.value

    const url = `http://localhost:3000/dogs/${dog.id}`
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        })
    })
    let dogRow = document.getElementById(`${dog.id}`);
    let form = document.querySelector('#dog-form');
    console.log(dogRow.children)

    dogRow.children[0].textContent = dog.name
    dogRow.children[1].textContent = dog.breed
    dogRow.children[2].textContent = dog.sex
    form.reset()
    dogRow.children[3].firstChild.addEventListener('click', function() {addEditListener(dog)})
}


function addEditListener (dog){
    console.log('%c Form Event Listener has been added!', 'color: green')
    let form = document.querySelector('#dog-form')
    form.addEventListener('submit', function() {updateDog(dog)})

    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
}




function dogView(dog){
    // console.log(dog)
    let tableRow = document.createElement('tr')
    tableRow.className = 'dog-row'
    tableRow.id = dog.id

    let tableDataName = document.createElement('td')
    tableDataName.className = 'name'
    tableDataName.textContent = dog.name

    let tableDataBreed = document.createElement('td')
    tableDataBreed.className = 'breed'
    tableDataBreed.textContent = dog.breed

    let tableDataSex = document.createElement('td')
    tableDataSex.className = 'sex'
    tableDataSex.textContent = dog.sex

    let tableDataButton = document.createElement('td')
    tableDataButton.className = 'button-holder'

    let button = document.createElement('button')
    button.className = 'dog-button'
    button.textContent = 'Edit Dog'
    button.dataset.id = dog.id
    button.addEventListener('click', function() {addEditListener(dog)})

    tableRow.appendChild(tableDataName)
    tableRow.appendChild(tableDataBreed)
    tableRow.appendChild(tableDataSex)
    tableRow.appendChild(tableDataButton)
    tableDataButton.appendChild(button)

    return tableRow
}

function makeDogs(dog) {
    let table = document.querySelector('#table-body')
    let row = dogView(dog)
    table.appendChild(row)
    console.log('%c Successfully made dogs!', 'color: green')
}

function populateDogs(){
    getDogs().then(function (dog) {
        dog.forEach(makeDogs)
    })
}

function getDogs(){
    const URL = "http://localhost:3000/dogs"
    return fetch(URL)
    .catch(error => console.log('%c Error Caught when fetching dogs from DataBase', 'color: firebrick'))
    .then(res => res.json())
    .then(res => res)
    console.log('%c Successfully fetched dogs from DataBase', 'color: green')
}

function setupPage() {
    populateDogs()
    console.log('%c Successfully ran Page Set-Up', 'color: green')
}
