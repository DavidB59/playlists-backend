const { Router } = require('express')
const User = require('./model')
const router = new Router()
const bcrypt = require('bcrypt')

router.post('/users', (req, res, next) => {

const user = {
	email: req.body.email,
	password: bcrypt.hashSync(req.body.password, 10)
}
if (req.body.confirmation !== req.body.password) {
  return res.status(404).send({
    message: `Passwords do not match `
  })
}
//console.log(req.body)
  User
    .create(user)
    .then(user => {

      return res.status(201).send(user.email)
    })
    .catch(error => next(error))
})

router.get('/users', (req, res, next) => {
  User
    .findAll()
    .then(users => {
      res.send({ users })
    })
    .catch(error => next(error))
})
router.get('/users/:id', (req, res, next) => {
  User
    .findById(req.params.id)
    .then(user=> {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.send(user)
    })
    .catch(error => next(error))
})

module.exports = router

