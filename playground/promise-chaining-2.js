require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('6012bca1c100320420d2a5ed').then(result => {
    console.log(result)
    return Task.countDocuments({ completed: false })
}).then(result => {
    console.log(`Remaining incomplete tasks: ${result}`)
})
.catch(console.log)