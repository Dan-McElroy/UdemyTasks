const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'testerpasser',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Dan McElroy',
        email: 'dan@example.com',
        password: 'testpass'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Dan McElroy',
            email: 'dan@example.com'
        }
    })
})

test('Passwords should be encrypted', async () => {
    const response = await request(app).post('/users').send({
        name: 'Dan McElroy',
        email: 'dan@example.com',
        password: 'testpass'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user.password).not.toBe('testpass')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'not@email.com',
        password: userOne.password
    }).expect(400)
})

test('Should get profile for user', async() => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async() => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async() => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const updates = { name: 'Phyllis', email: 'drinkle@test.com', age: 28 } 
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(updates)
        .expect(200)

    console.log(userOneId)
    const user = await User.findById(userOneId)
    expect(user).toEqual(expect.objectContaining(updates))
})

test('Should update valid user fields', async () => {
    const updates = { name: 'Phyllis', _id: new mongoose.Types.ObjectId(), age: 28 } 
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(updates)
        .expect(400)

    console.log(userOneId)
    const user = await User.findById(userOneId)
    expect(user).not.toEqual(expect.objectContaining(updates))
})