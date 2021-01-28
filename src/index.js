const express = require('express')

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
    
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.get('/users/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.sendStatus(404)
        }
        res.send(user)
    } catch {
        res.sendStatus(500)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.sendStatus(404)
        }
        res.send(task)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})