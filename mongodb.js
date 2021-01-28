const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Dan',
    //     age: 28
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //     name: 'Jen',
    //     age: 31
    // }, {
    //     name: 'Gunther',
    //     age: 65
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Do the first thing',
            completed: true
        },
        {
            description: 'Do the second thing',
            completed: false
        },
        {
            description: 'Do the third thing',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable insert tasks!')
        }
        console.log(result.ops)
    })
})