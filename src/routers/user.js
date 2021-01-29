const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jp(e)?g|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined, true)
    }
})

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.sendStatus(500)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.sendStatus(500)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    res.sendStatus(200)
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const disallowedUpdates = updates.filter(update => !allowedUpdates.includes(update))

    if (disallowedUpdates.length > 0) {
        return res.status(400).send({ error: `Invalid updates! Field(s) ${disallowedUpdates.join(', ')} cannot be updated.` })
    }
    try {
        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router