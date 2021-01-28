require('../src/db/mongoose')
const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age: age })
    return await User.countDocuments({ age })
}

updateAgeAndCount('6012baef815be837c81c3a3c', 3).then(console.log).catch(console.log)