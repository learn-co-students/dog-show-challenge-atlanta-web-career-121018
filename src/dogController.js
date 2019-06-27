function editDog(event) {
  const dogId = event.target.dataset.id
  const form = document.querySelector('#dog-form')

  getDog(dogId).then((dog) => {
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    updateDog(dogId, form)
    updateDogView(dogId, form)

    event.target.reset()
  })
}
