// Dependencies
const mongoose = require('mongoose')
const Schema = require('../../models/links.js')
const prod = true

module.exports = class Update {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Data base connect
   */
  getModel (res) {
    if (prod) {
      mongoose.connect('mongodb://mongo:27017/ApiCrawl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    } else {
      mongoose.connect('mongodb://localhost:27017/ApiCrawl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    }

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
    this.app.put('/links/update', (req, res) => {
      try {
        const { idProfile, contacts, state } = req.body
        const newLink = {}
        if (contacts) {
          newLink['contacts'] = contacts
        }
        if (state) {
          newLink['state'] = state
        }
        // Update
        this.getModel(res).update({ idProfile }, newLink, (err, result) => {
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
