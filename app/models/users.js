const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  idProfile: String,
  lastname: String,
  firstname: String,
  photo: String,
  url: String,
  description: String,
  career: Array,
  skills: Array,
  languages: Array,
  hobbies: Array,
  contacts: Array
})

UserSchema.index({
  idProfile: 1
}, {
  unique: true
})

module.exports = UserSchema
