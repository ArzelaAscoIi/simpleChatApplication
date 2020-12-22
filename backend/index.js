const express = require('express')
const fs = require('fs');
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()

var corsOptionsDelegate = function (req, callback) {
    var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))

app.use(bodyParser.json({
    limit: '20mb',
    type: "application/json"
}))
//server.use(bodyParser.urlencoded({ limit: '20mb', extended: true, parameterLimit: 1000000 }))
// parse some custom thing into a Buffer

app.use(bodyParser.raw({ limit: '20mb', type: "application/x-www-form-urlencoded" }))


const port = 3000

let messages = []

let init = function () {
    if (messages.length === 0) {
        messages = JSON.parse(fs.readFileSync("./backend/data/messages.json"))
    }

}

init()


app.get('/', (req, res) => {
    try {
        res.status(200).send(messages)
    } catch (err) {
        res.status(500).send()
    }
})

app.post('/', (req, res) => {
    try {
        req.body.timestamp = Date.now()
        messages.push(req.body)
        fs.writeFile("./backend/data/messages.json", JSON.stringify(messages), (err) => {
            if (err) throw err;
            res.status(200).send()
        });

    } catch (err) {
        res.status(500).send()
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
