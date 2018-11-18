const { Router } = require('express')
const Song = require('./model')
const router = new Router()
const auth = require('../auth/middleware')

router.post('/playlists/:id/songs',auth, (req, res, next) => {
  Song
    .create({
      album :req.body.album,
      title :req.body.title,
      artist :req.body.artist,
      playlistId :req.url.split('/')[2]} )
    .then(song => {
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})
module.exports = router