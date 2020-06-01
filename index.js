//import the express package
const express = require('express')

//create a server obj
const server = express()

server.use(express.json())// parses data into json


let users = []


server.get('/', (req, res) => { 
    res.json({message: "hello from the server!! "})
})

server.get('/api/users', (req, res) => {
    
})


server.post('/api/users', (req, res) => {
    const userInfo = req.body
    console.log(userInfo)
    users.push(userInfo)
    res.status(201).json(userInfo);
})


//server is listening for requests 
const port = 5000 

server.listen(port, () => {
    console.log(`listening on http://localhost${port}`)
})
