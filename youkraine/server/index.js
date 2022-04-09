const config = require('config') // DO NOT IMPORT
const express = require('express') // DO NOT IMPORT
const { MongoClient } = require('mongodb')

const HOST = config.get('server.host')
const PORT = config.get('server.port')
const URI = config.get('mongodb.uri')

const app = express()

app.get('/', (req, res) => {
  res.json('Hello to my app!')
})

app.post('/signup', (req, res) => {
  res.json('Hello to my app!')
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(URI)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    
    const returnedUsers = await users.find().toArray()
    res.send(returnedUsers)
  } finally {
    await client.close()
  }
})


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))