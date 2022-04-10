const config = require('config') 
const express = require('express') 
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const HOST = config.get('server.host')
const PORT = config.get('server.port')
const URI = config.get('mongodb.uri')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello to my app!')
})

app.post('/signup', async (req, res) => {
  const client = new MongoClient(URI)
  const { email, password } = req.body
  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log(req.body)

  // Send over to database
  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const existingUser = await users.findOne({ email })

    if (existingUser) {
      return res.status(409).send('User already exists! Please login.')
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword
    }
    const insertedUser = await users.insertOne(data)

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 48, // Expires in 48hrs
    })

    res.status(201).json({ token, userId: generatedUserId })

  } catch (err) {
    console.log(err)
  }

})

app.post('/login', async (req, res) => {
  const client = new MongoClient(URI)
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const user = await users.findOne({ email })

    const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 48, // Expires in 48hrs
      })
      res.status(201).json({ token, userId: user.user_id })
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
  }
})

app.get('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  console.log('userId', userId)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    
    const query = { user_id: userId}
    const user = await users.findOne(query)
    res.send(user)
  } finally {
    await client.close()
  }
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

app.put('/user', async (req, res) => {
  const client = new MongoClient(URI)
  const formData = req.body.formData

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: formData.user_id }
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches
      },
    }
    const insertedUser = await users.updateOne(query, updateDocument)
    res.send(insertedUser)
  } finally {
    await client.close()
  }

})














app.listen(PORT, () => console.log('Server running on PORT ' + PORT))