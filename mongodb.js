const mongodb = require('mongodb')

const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    db.collection('users').deleteMany({ 
        age: 28
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({ 
        description: 'Do the second thing'
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
})