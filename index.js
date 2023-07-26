import express from "express"
import users from "./MOCK_DATA.json" assert { type: "json" };
const app = express()
const PORT = 8000

//returns json

//get all users
app.get('/api/users', (req, res) => {
    res.json(users)
})


//put, patch, delete, get by id concat into one common route
app.route('/api/users/:id').put((req, res) => {
    return res.json("put pending")
}).patch((req, res) => {
    return res.json("patch pending")
}).delete('/api/users/:id', (req, res) => {
    return res.json("delete pending")
}).get('/api/users/:id', (req, res) => {
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

    users = users.push(newUser)
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