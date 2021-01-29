const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisishisnewcourse')
        console.log(decoded._id)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('User:',decoded)
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send(JSON.stringify(e))
    }
}

module.exports = auth