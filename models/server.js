const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/api/user'; 
        
        // Connect to db
        this.connectDatabase();

        // Middlewares
        this.middlewares();
        
        // Routes
        this.routes();
    }

    async connectDatabase() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // body parser
        this.app.use(express.json())

        // Public directory
        this.app.use(express.static('public'))
    }

    routes() {
       this.app.use(this.userPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }

}

module.exports = Server;