const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')
const router = new Router()
const auth = require('../auth/middleware')

router.get('/playlists',auth,(req,res,next) => {
  Playlist
    .findAll()
    .then(playlists => {
       res.send(playlists.filter( playlist => playlist.userId === req.user.id))
    })
    .catch(error => next(error))
})

router.get('/playlists/:id',auth, (req, res, next) => {
  Playlist
  .findById(req.params.id, { include: [Song]})
  .then(playlist=> {
      if (!playlist ||playlist.userId !== req.user.id ) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create({name:req.body.name, userId:req.user.id})
    .then(playlist=> {
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})


router.delete('/playlists/:id',auth, (req, res, next) => {
  Playlist
    .findById(req.params.id, { include: [Song]})
    .then(playlist=> {
      if (!playlist ||playlist.userId !== req.user.id ) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
  
})

module.exports = router