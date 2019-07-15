import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {Routes} from './routes'

admin.initializeApp(functions.config().firebase)
export class Server {
    public app:any
    public main:any


    constructor(){
        this.app = express()
        this.main = express()
    }

    //Zona de middlewares
    appConfig(){
        this.main.use('/api/v1',this.app)
        this.main.use(bodyParser.json())
    }

    //Incluimos las rutas
    includeRoutes(){
        new Routes(this.app).appRoutes()
    }

    //Inicializaciones antes de que se inicie el servidor
    appExecute(){
        this.appConfig()
        this.includeRoutes()
    }



}