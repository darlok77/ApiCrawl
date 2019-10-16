const CreateUser = require('./user/create.js')
const ShowUser = require('./user/show.js')
const SearchUser = require('./user/search.js')
const UpdateUser = require('./user/update.js')

const CreateLink = require('./link/create.js')
const ShowLink = require('./link/show.js')
const SearchLink = require('./link/search.js')
const UpdateLink = require('./link/update.js')

module.exports = {
  user: {
    CreateUser,
    ShowUser,
    SearchUser,
    UpdateUser
  },
  link: {
  	CreateLink,
  	ShowLink,
  	SearchLink,
    UpdateLink
  }
}
