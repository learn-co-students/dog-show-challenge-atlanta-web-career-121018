document.addEventListener('DOMContentLoaded', () => {
  setUpPage();
})

function setUpPage() {
  displayAllDogs();
}

function fetchAllDogs() {
  const url = 'http://localhost:3000/dogs'
  return fetch(url)
    .then(res => res.json())
}

function displayAllDogs(){
  const dogTable = document.querySelector('#table-body')
  dogTable.innerHTML = ""
  fetchAllDogs().then((dogs) => {
    dogs.forEach(renderAllDogs)
  })
}

function renderAllDogs(dog) {
  const dogTable = document.querySelector('#table-body')
  const row = document.createElement('tr')
  const dogName = document.createElement('td')
  const dogBreed = document.createElement('td')
  const dogSex = document.createElement('td')
  const edit = document.createElement('button')

  dogTable.appendChild(row)
  row.appendChild(dogName)
  row.appendChild(dogBreed)
  row.appendChild(dogSex)
  row.appendChild(edit)

  dogName.textContent = dog.name
  dogBreed.textContent = dog.breed
  dogSex.textContent = dog.sex
  edit.textContent = "Edit"
  edit.dataset.id = dog.id

  edit.addEventListener('click', function() {updateDog(dog)})
}

function updateDog(dog) {
  const form = document.querySelector('#dog-form')
  form.addEventListener('submit', function() {patchDog(dog)})

  form.name.value = dog.name
  form.breed.value = dog.breed
  form.sex.value = dog.sex
}



function patchDog(dog){
  event.preventDefault();
  dog.name = event.target.name.value
  dog.breed = event.target.breed.value
  dog.sex = event.target.sex.value
  console.log(dog)
  const url = `http://localhost:3000/dogs/${dog.id}`
  fetch(url, {
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
  displayAllDogs()
  document.location.reload()
}
