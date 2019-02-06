document.addEventListener("DOMContentLoaded", setupPage)
let dogTable = document.querySelector('#table-body')
let form = document.querySelector('#dog-form')

function setupPage() {
    renderAllDogs()
}

function renderAllDogs() { 
    dogTable.innerHTML = ""
    const url = `http://localhost:3000/dogs`;
    getDog(url).then(function (data) {
        data.forEach(renderDog)
    })
} 

function getDog(url) { 
    return fetch(url).then(res => res.json())
}  

function renderDog(dog) {
    let element = document.createElement('tr')
    element.dataset.id = dog.id
    
        let dogName = document.createElement('td')
        dogName.textContent = dog.name
        element.appendChild(dogName) 

        let dogBreed = document.createElement('td')
        dogBreed.textContent = dog.breed
        element.appendChild(dogBreed)

        let dogSex = document.createElement('td')
        dogSex.textContent = dog.sex
        element.appendChild(dogSex)
        
        let buttonContainer = document.createElement('td')
            let editButton = document.createElement('button')
            editButton.textContent = 'Edit Dog'
            editButton.addEventListener('click', function() {updateDog(dog)})
            buttonContainer.appendChild(editButton)
        element.appendChild(buttonContainer)
    
    dogTable.appendChild(element)
} 

function updateDog(dog) {
    // console.log(dog, "in the update fn")
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex 

    form.addEventListener('submit', function() {patchDog(dog)})
}

function patchDog(dog) {
    // console.log(dog, "in the patch fn")
    event.preventDefault()
    dog.name = event.target.name.value
    dog.breed = event.target.breed.value
    dog.sex = event.target.sex.value

    const url2 = `http://localhost:3000/dogs/${dog.id}`
    fetch(url2, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        })
    })
    renderAllDogs()
    document.location.reload() //refreshes browser and clears form 
} 
