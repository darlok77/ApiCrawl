const mongoose = require('mongoose')
const Schema = require('../../models/links.js')

module.exports = class Show {
  constructor (app) {
    this.app = app

    this.run()
  }
  
  /**
   * Data base connect
   */
  getModel (res) {
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

    return Link
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.get('/links/show', (req, res) => {
      let params = {}
      if (req.query.id) {
        params.idProfile = req.query.id
      }
      if (req.query.contacts) {
        params.contacts = req.query.contacts
      }
      console.log(params)
      try {
        this.getModel(res).find(params, function (err, link) { 
          if (err) {
            res.status(404).json({
              code: 404,
              message: 'Link not found'
            })
          }
          else{
            res.status(200).json(link)
          }
        });
      } catch (e) {
        console.error(`[ERROR] link/show/:id -> ${e}`)
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
