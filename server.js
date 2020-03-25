const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.listen('3000', () => { console.log('server connecting ....') })

app.post('/post', verify, (req, res) => {
    console.log("req.token is:", req.token)
    jwt.verify(req.token, '123456789', (error, decod) => {
        res.send('WELCOM')
    })

})

app.post('/login', (req, res) => {

    jwt.sign({ name: 'sara' }, '123456789', (error, token) => {
        res.send(token)
    })
})

function verify(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token)
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        console.log(token)
        req.token = token

        next()
    }


}