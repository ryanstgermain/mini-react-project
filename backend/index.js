var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.use(function (req, res, next) {
    res.status(404).send("Sorry I can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke...')
})

app.get('/products/:id', function(req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(3001, function () {
    console.log('CORS-enabled web server listening on port 3001')
})
