const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const now = new Date()
      res.send(`<p>Phonebook has info for ${count} people</p><p>${now.toString()}</p>`)
    })
    .catch(error => next(error))
})

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter
