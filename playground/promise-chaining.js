require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('6012baef815be837c81c3a3c', { age: 2 }).then(user => {
    console.log(user)
    return User.countDocuments({ age: 2 })
}).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})