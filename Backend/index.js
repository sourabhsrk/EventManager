const express = require('express')
require('dotenv').config();
const connectToMongo = require('./db');
var cors = require('cors')
const app = express()
const port = 5000

connectToMongo();
app.get('/', (req, res) => {
  res.send('Welcome to EventManager Backend')
})

app.use(cors())
app.use(express.json());
//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/users', require('./routes/users'))

app.listen(port, () => {
  console.log(`EventManager Backend listening on port ${port}`)
})