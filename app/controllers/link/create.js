// Dependencies
const mongoose = require('mongoose')
const Schema = require('../../models/links.js')

module.exports = class Create {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Data base connect
   */
  getModel (res, payload) {
    // mongoose.connect('mongodb://mongo:27017/ApiCrawl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    mongoose.connect('mongodb://localhost:27017/ApiCrawl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

    this.db = mongoose.connection
    this.db.on('error', () => {
      res.status(500).json({
        'code': 500,
        'message': 'Internal Server Error'
      })

      console.error(`[ERROR] links/create getModel() -> Connetion fail`)
    })

    const Link = mongoose.model('Link', Schema)
    const model = new Link

    model.idProfile = payload.idProfile
    model.state = false
    model.contacts = false

    return model
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/links/create', (req, res) => {
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
        console.error(`[ERROR] link/create -> ${e}`)
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
