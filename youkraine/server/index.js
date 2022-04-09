const config = require('config') // DO NOT IMPORT
const express = require('express') // DO NOT IMPORT

const HOST = config.get('server.host')
const PORT = config.get('server.port')

const app = express()

app.get('/', (req, res) => {
  res.json('Hello to my app!')
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))