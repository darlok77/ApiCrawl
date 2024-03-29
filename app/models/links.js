const mongoose = require('mongoose')
const LinkSchema = new mongoose.Schema({
  idProfile: String,
  state : Boolean,
  contacts: Boolean
})

LinkSchema.index({
  idProfile: 1
}, {
  unique: true
})

module.exports = LinkSchema
