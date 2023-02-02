const express = require('express')
const app = express()

app.use(express.json())
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
]


app.get('/info', (req, res) => {
    const now = new Date();
    res.send('<p>Phonebook has info for ' + persons.length + ' people </p> ' + now.toString())
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    
    response.json(person)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (persons.find(item => item.name === person.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
          })
    }else if (persons.find(item => item.number === person.number)){
        return response.status(400).json({ 
            error: 'number must be unique' 
          })
    }else{
        person.id = Math.floor(Math.random() * 100);
        persons = persons.concat(person)
        response.json(person)
    }

  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })