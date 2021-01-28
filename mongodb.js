const mongodb = require('mongodb')

const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    db.collection('users').updateOne({ 
        _id: new ObjectID('60115e407083b93f0010a638')
    }, {
        $inc: {
            age: 20
        }
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    
    db.collection('tasks').updateMany({ 
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result.modifiedCount)
    }).catch(error => {
        console.log(error)
    })
})