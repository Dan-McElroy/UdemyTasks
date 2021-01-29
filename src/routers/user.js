const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/users/:id', async (req, res) => {

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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const disallowedUpdates = updates.filter(update => !allowedUpdates.includes(update))

    if (disallowedUpdates.length > 0) {
        return res.status(400).send({ error: `Invalid updates! Field(s) ${disallowedUpdates.join(', ')} cannot be updated.` })
    }
    try {
        const user = await User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.sendStatus(404)
        }
        res.send(user)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.sendStatus(404)
        }
        res.send(user)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router