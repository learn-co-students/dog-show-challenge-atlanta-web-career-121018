document.addEventListener("DOMContentLoaded", setupPage)
let dogTable = document.querySelector('#table-body')

function setupPage() {
    renderAllDogs()
}

function renderAllDogs() { 
    dogTable.innerHTML = ""
    let url = `http://localhost:3000/dogs`;
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
            buttonContainer.appendChild(editButton)
        element.appendChild(buttonContainer)
    
    dogTable.appendChild(element)
}
