// Dependencies
const mongoose = require('mongoose')
const Schema = require('../../models/users.js')

module.exports = class Create {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Data base connect
   */
  getModel (res, payload) {
    mongoose.connect('mongodb://localhost:27017/ApiCrawl', { useNewUrlParser: true, useUnifiedTopology: true })

    this.db = mongoose.connection
    this.db.on('error', () => {
      res.status(500).json({
        'code': 500,
        'message': 'Internal Server Error'
      })

      console.error(`[ERROR] user/create getModel() -> Connetion fail`)
    })

    const User = mongoose.model('User', Schema)
    const model = new User

    model.idProfile = payload.idProfile
    model.lastname = payload.lastname
    model.firstname = payload.firstname
    model.photo = payload.photo
    model.url = payload.url
    model.description = payload.description
    model.career = payload.career
    model.skills = payload.skills
    model.languages = payload.languages
    model.hobbies = payload.hobbies
    model.contacts = payload.contacts

    return model
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/user/create', (req, res) => {
      try {

        // Save
        this.getModel(res, req.body).save((err, result) => {
          if (err) {
            res.status(500).json({
              'code': 500,
              'message': 'Internal Server Error'
            })

            this.db.close()
          }

          res.status(200).json(result)
        })
      } catch (e) {
        console.error(`[ERROR] user/create -> ${e}`)
        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}