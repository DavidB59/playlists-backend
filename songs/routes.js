const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')
const router = new Router()

router.get('/songs',(req,res,next) => {
  Song
    .findAll()
    .then(songs => {
      res.send({songs})
    })
    .catch(error => next(error))
})
router.get('/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id, { include: [Playlist]})
    .then(song => {
      return res.send(song)
    })
    .catch(error => next(error))
})

router.post('/playlists/:id/songs', (req, res, next) => {
  Song
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

router.put('/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body).then(song => res.send(song))
    })
    .catch(error => next(error))
})

router.delete('/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router