const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
   // defaultValue: req.user.id
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})
Playlist.belongsTo(User)
Playlist.hasMany(Song, {onDelete: 'CASCADE'})
module.exports = Playlist



