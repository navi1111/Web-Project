const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({

  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'test'
  }
});

const app = express();

app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {

  console.log("App radi")
})

app.post('/signin', (req, res) => {

  db.select('*').from('tabla')
    .where('email', '=', req.body.email)
    .where('password', '=', req.body.password)
    .then(data => {

      res.status(200).json(data)
    })
    .catch(err => res.status(400).json('wrong credentials'))

})


app.post('/register', (request, response) => {
  const { email, name, password } = request.body;
  console.log(request.body)
  if (email.includes("@") && password.length > 0 && name.length > 0)
    db.insert({
      password: password,
      email: email,
      name: name
    })
      .into('tabla')
      .returning('*')
      .then(res => {
        response.json(res[0])
      })
      .catch(err => response.status(400).json(err))
  else
    res.status(400).json("Bad response")
})


app.get('/profile/:id', (req, res) => {
  const { email } = req.params;
  db.select('*').from('tabla').where({ email })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})



app.listen(3000, () => {
  console.log('app is running on port 3000');
})
