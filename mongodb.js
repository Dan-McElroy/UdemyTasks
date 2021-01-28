const mongodb = require('mongodb')

const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    db.collection('users').find({ age: 28 }).toArray((error, users) => {
        console.log(users)
    })
    
    db.collection('users').find({ age: 28 }).count((error, count) => {
        console.log(count)
    })

    db.collection('tasks').findOne({ _id: new ObjectID('60129c68fbd9071050acee59')}, (error, task) => {
        if (error) {
            return console.log(error)
        }
        console.log(task.description)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log(error)
        }
        tasks.forEach(task => {
            console.log(task.description)
        })
    })
})