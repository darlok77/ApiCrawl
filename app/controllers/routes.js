const CreateUser = require('./user/create.js')
const ShowUser = require('./user/show.js')
const SearchUser = require('./user/search.js')
const CreateLink = require('./link/create.js')
const ShowLink = require('./link/show.js')
const UpdateLink = require('./link/search.js')

module.exports = {
  user: {
    CreateUser,
    ShowUser,
    SearchUser
  },
  link: {
  	CreateLink,
  	ShowLink,
  	UpdateLink
  }
}