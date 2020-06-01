//import the express package
const express = require('express')

//create a server obj
const server = express()


server.get('/', (req, res) => { 
    res.json({message: "hello from the server BOYYYY"})
})






//server is listening for requests 
const port = 5000 

server.listen(port, () => {
    console.log(`listening on http://localhost${port}`)
})
