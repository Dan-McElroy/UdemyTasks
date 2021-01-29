const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.sendStatus(404)
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const disallowedUpdates = updates.filter(update => !allowedUpdates.includes(update))

    if (disallowedUpdates.length > 0) {
        return res.status(400).send({ error: `Invalid updates! Field(s) ${disallowedUpdates.join(', ')} cannot be updated.` })
    }
    try {
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])

        await task.save()
        if (!task) {
            return res.sendStatus(404)
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.sendStatus(404)
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router