const URL = "http://localhost:3000/dogs/"

function getDogs() {
  return fetch(URL)
    .then(res => res.json())
}

function getDog(dogId) {
  return fetch(URL + dogId)
    .then(res => res.json())
}

function updateDog(dogId, form) {
  return fetch(URL + dogId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value
    })
  })
}
