const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
var data = require('./data.json')

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
    res.send({ data })
})

app.get('/:id', (req, res) => {
    var { id } = req.params
    var filtered = data.filter(obj => {
        return obj.id == id
    })
    res.send({ data: filtered })
})

app.post('/', (req, res) => {
    var { body } = req
    var obj = {
        id: data.length + 1,
        ability: body.name
    }
    data.push(obj)
    res.send({ data: obj })
})

app.put('/:id', (req, res) => {
    var { body } = req
    var { id } = req.params

    var mapped = data.map(obj => {
        if(id == obj.id){
            obj = {
                id: obj.id,
                ...body
            }
        } return obj
    })
    data = mapped
    res.send({ data })
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry I can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke...')
})

app.delete('/:id', (req, res) => {
    var { id } = req.params
    var mapped = data.filter(obj => {
        return obj.id != id
    })
})

app.listen(3001, function () {
    console.log('CORS-enabled web server listening on port 3001')
})
