function renderDogs(dogs) {
  console.log(dogs);
  dogs.forEach(renderDog)
}

function renderDog(dog) {
  const table = document.querySelector('table')

  const row = document.createElement('tr')
  row.id = 'dog' + dog.id
  table.appendChild(row)

  const dogName = document.createElement('td')
  dogName.textContent = dog.name
  row.appendChild(dogName)

  const dogBreed = document.createElement('td')
  dogBreed.textContent = dog.breed
  row.appendChild(dogBreed)

  const dogSex = document.createElement('td')
  dogSex.textContent = dog.sex
  row.appendChild(dogSex)

  const dogEdit = document.createElement('td')
  row.appendChild(dogEdit)

  const editButton = document.createElement('button')
  editButton.textContent = 'Edit'
  editButton.dataset.id = dog.id
  dogEdit.appendChild(editButton)
  editButton.addEventListener('click', editDog)
}

function updateDogView(dogId, form) {
  const row = document.querySelector('#dog' + dogId)

  row.children[0].textContent = form.name.value
  row.children[1].textContent = form.breed.value
  row.children[2].textContent = form.sex.value
}
