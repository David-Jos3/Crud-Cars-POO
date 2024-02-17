import { ZodError } from 'zod'
import { carSchema, Cars } from '../controllers/cars/CarsControllers'
import { Request, Response, NextFunction } from 'express'

export class CarValidation {
  public validation(req: Request, res: Response, next: NextFunction) {
    try {
      const { ano, marca, modelo }: Cars = req.body
      carSchema.parse({ ano, marca, modelo })
      next()
    } catch (error) {
      error instanceof ZodError
        ? res.status(400).json({ message: error.issues[0].message })
        : res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
