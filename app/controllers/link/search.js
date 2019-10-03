// Core
const mongoose = require('mongoose')
const Schema = require('../../models/links.js')

module.exports = class Search {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Data base connect
   */
  getModel (res) {
    mongoose.connect('mongodb://localhost:27017/ApiCrawl', { useNewUrlParser: true,  useUnifiedTopology: true })

    this.db = mongoose.connection
    this.db.on('error', () => {
      res.status(500).json({
        'code': 500,
        'message': 'Internal Server Error'
      })

      console.error(`[ERROR] link/create getModel() -> Connetion fail`)
    })

    const Link = mongoose.model('Link', Schema)


    return Link
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/link/search', (req, res) => {
      try {
        const result = {}
        const ids = req.body.ids
        
       let linkIds = []
        let links = []

        console.log(ids)
        this.getModel(res).find({
          
                  '_id': {$in: ids}
               
        }).exec().then(data => {
          console.log(data)
          res.status(200).json({
            'data': data,
            'code': 200,
            'message': 'Good request'
          })
        })


        
      } catch (e) {
        console.error(`[ERROR] link/search -> ${e}`)
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
