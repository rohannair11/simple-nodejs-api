import express from "express"
import users from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs"
const app = express()
const PORT = 8000

//middleware
app.use(express.json())

//get all users
app.get('/api/users', (req, res) => {
    res.json(users)
})


//put, patch, delete, get by id concat into one common route
app.route('/api/users/:id').patch((req, res) => {
    return res.json("patch pending")
}).delete((req, res) => {

    const Userid = parseInt(req.params.id, 10)
    const userIndex = users.findIndex(user => user.id === Userid)
    if (userIndex === -1){
        res.status(404).json({"error": "user not found"})
    }
    const deletedUser = users.splice(userIndex, 1)[0]
    return res.json({message: "user deleted", user: deletedUser})


}).get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id );
    return res.json(user)
})


app.post('/api/users', (req, res) => {
    const {first_name, last_name, email, gender, job_title} = req.body
    
    const newUser = {
        id: users.length + 1,
        first_name, 
        last_name, 
        email,
        gender,
        job_title,
    }


    users.push(newUser)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json("success")
    })

    res.status(201).json({ message: 'User added successfully!', user: newUser });
})


//returns html
app.get('/users', (req, res) => {
    const template = `
        <ul>
            ${users.map(user => `<li>  ${user.first_name} </li>`).join("")}
        </ul>
    `
    res.send(template)
})


app.listen(PORT, () => console.log(`server running on ${PORT} port`))