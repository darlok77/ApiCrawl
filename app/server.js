// Dependencie
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

// Core
const routes = require('./controllers/routes.js')

/**
 * Server
 */
module.exports = class Server {
  constructor () {
    this.app = express()

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({
      'extended': true
    }))
    this.app.use(bodyParser.json())
  }

  /**
   * Routes
   */
  routes () {
    new routes.user.CreateUser(this.app)
    new routes.user.ShowUser(this.app)
    new routes.user.SearchUser(this.app)
    new routes.user.UpdateUser(this.app)

    new routes.link.CreateLink(this.app)
    new routes.link.SearchLink(this.app)
    new routes.link.ShowLink(this.app)
    new routes.link.UpdateLink(this.app)

    // If route not exist
    this.app.use((req, res) => {
      console.log('pb1')
      res.status(404).json({
        'code': 404,
        'message': 'Not Found'
      })
    })
  }

  /**
   * Security
   */
  security () {
    this.app.use(helmet())
    this.app.disable('x-powered-by')
  }

  /**
   * Run
   */
  run () {
    try {
      this.security()
      this.middleware()
      this.routes()
      this.app.listen(4000)
    } catch (e) {
      console.error(`[ERROR] Server -> ${e}`)
    }
  }
}
