require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('6012d29d3d7e9a25c06c8d7c').then(console.log).catch(console.log)