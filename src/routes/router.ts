import express, { Router, Request, Response } from 'express'
import { CarControllers } from '../controllers/cars/CarsControllers'
import { CarValidation } from '../middleware/carValidation'

const carControllers = new CarControllers()
const carValidation = new CarValidation()

class Routers {
  router: Router
  constructor() {
    this.router = express.Router()
    this.getAllCars()
    this.createCars()
    this.getCarsById()
    this.updateCarsById()
    this.deleteCarsById()
    this.routerInitialization()
  }

  routerInitialization() {
    this.router.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Só funciona com reza braba' })
    })
  }

  createCars() {
    this.router.post('/cars', carValidation.validation, carControllers.create)
  }

  getAllCars() {
    this.router.get('/cars', carControllers.getAll)
  }

  getCarsById() {
    this.router.get('/cars/:id', carControllers.getById)
  }

  updateCarsById() {
    this.router.put('/cars/:id', carControllers.update)
  }

  deleteCarsById() {
    this.router.delete('/cars/:id', carControllers.delete)
  }
}

export const routers = new Routers()
