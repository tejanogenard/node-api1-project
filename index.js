//import the express package
const express = require('express')

// adding uuid
const uuid = require('uuid')

//create a server obj
const server = express()

// parses data into json
server.use(express.json())


let users = [                           // I beleive it is because my data us being created and stored 
    {                                   // and postman is not looking for an id and wont make me one         
        id: 1,                          // id is expecting to be a string that is also maybe why put is returning an id of type string. 
        name: "genard tejano",
        bio: "coolest doode",
    },
    {
        id: 2, 
        name: "Ivan Tejano",
        bio: "cooler doode",
    }
]

// get request for the tests 
server.get('/', (req, res) => { 
    res.json({message: "hello from the server!! "})
})

// get all users inside the array
server.get('/api/users', (req, res) => {
    if (!users) {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    } else {
        res.status(200).json(users)
    }

})

//get a specific user by the id 
server.get('/api/users/:id', (req, res) => {    // kinda understand what is the find function doing
    const id = req.params.id                    // why double == vs === 
    const find = users.find(user => user.id == id)
    if (!find) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(200).json(find)
    }

})

// delete a user by their id 
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    users = users.filter(user => user.id !== Number(id))
    if (!users) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(200).json(users)
    }

})

//create a new user and add it to the array
// server.post('/api/users', (req, res) => {
    
//     const userInfo = req.body   
//     if (userInfo.name === "" || userInfo.bio === "") {
//         res.status(400).json({
//             message: "Please provide a name and bio for the user"
//         })
//     } else if (!userInfo) {
//         res.status(500).json({
//             message: "there was an error creating the user to the database"
//         })
//     } else {
//         users.push(userInfo)
//         res.status(201).json(userInfo);
//     }

// })
server.post('/api/users', (req, res) => {
    const userInfo = {
      id: uuid.v4(),            // cannot initialize id to type of id 
      name: req.body.name,
      bio: req.body.bio
    }
    if (userInfo.name === "" || userInfo.bio === "") {
                res.status(400).json({
                    message: "Please provide a name and bio for the user"
                })
            } else if (!userInfo) {
                res.status(500).json({
                    message: "there was an error creating the user to the database"
                })
            } else {
                users.push(userInfo)
                res.status(201).json(userInfo);
            }
        })

//Update a user by their id 
server.put("/api/users/:id", (req, res) => {
	// const userUpdate = req.body;
     const { id }= req.params;              // case seems to be similar here as well 
    
    const updatedUser = {
        body: req.body,
        id: req.params.id
    }

	if (!updatedUser.body.name || !updatedUser.body.bio) {
		res.status(400).json({
         errorMessage: "Please provide name and bio for the user." });
	} else {
		const user = users.find((user) => user.id == id);
		if (user) {
            res.status(200).json(user)
			users = users.map((user) => {
				return user.id == id ? { ...updatedUser } : user;
			});
			const updateUser = users.find((user) => user.id == id);
			if (updateUser) {
                res.json(users);
            } else {
                res.status(500).json({
                 errorMessage: "The information could not be modified." });
            }	 
		} else {
			res.status(404).json({
             errormessage: "The user with the specified ID does not exist." });
		}
	}
});



//server is listening for requests 
const port = 5000 

server.listen(port, () => {
    console.log(`listening on http://localhost${port}`)
})
 