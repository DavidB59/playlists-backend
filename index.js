const express = require('express')
const bodyParser = require('body-parser')
const songsRouter = require('./songs/routes')
const playlistsRouter = require('./playlists/routes')
const authRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 4000

app
  .use(cors())
  .use(bodyParser.json())
  .use(playlistsRouter)
  .use(songsRouter)
  .use(authRouter)
  .use(usersRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))


  