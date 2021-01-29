const express = require('express')

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async() => {
    // const task = await Task.findById('60141e79126fec43e0b92f0f')

    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('60141e14a1a6d60fb40e525a')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()