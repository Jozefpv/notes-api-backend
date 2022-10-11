const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    next()
})


let notes = [
    {
      id: 1,
      content: "HTML es facil",
      date: "10/02/1999",
      important: true
    },
    {
      id: 2,
      content: "PHP es un rollo",
      date: "20/11/2001",
      important: false
    },
    {
      id: 3,
      content: "React tiene cosas",
      date: "23/11/1970",
      important: true
    } 
  ]

app.get('/',(request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes',(request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id',(request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if(note) {
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.json(notes)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content ,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()

    }
    notes.concat(newNote)
    response.status(201).json(newNote)
})

app.use((request, response, next) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = 3001
app.listen(PORT , () => {
    console.log(`Server listen on port ${PORT}`)
})
