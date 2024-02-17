import express from 'express'
import 'dotenv/config'
import { routers } from './routes/router'

class Server {
  private app: express.Application
  private port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.app.use(express.json())
    this.app.use(routers.router)
  }

  public start() {
    this.app.listen(this.port, () =>
      console.log(`App rodando na porta  ${this.port}`),
    )
  }
}

const server = new Server()
server.start()
