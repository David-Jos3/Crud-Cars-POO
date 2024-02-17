import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { z } from 'zod'

export const carSchema = z.object({
  ano: z.number().min(1886, {
    message: 'Meu amigo coloque o ano do seu carro corretamente ',
  }),
  marca: z.string().min(2, { message: 'insira mais de um caractere ' }),
  modelo: z.string().min(3, { message: 'insira mais de um caractere ' }),
})

export type Cars = z.infer<typeof carSchema>

export class CarControllers {
  public async create(req: Request, res: Response) {
    try {
      const { ano, marca, modelo }: Cars = req.body
      await prismaClient.carros.create({
        data: {
          ano,
          marca,
          modelo,
        },
      })
      res.status(201).json({ message: 'Deu bom rapaziada' })
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const allCars = await prismaClient.carros.findMany()
      res.status(201).json(allCars)
    } catch {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const carsId = await prismaClient.carros.findUnique({
        where: { id: Number(id) },
      })
      res.status(201).json(carsId)
    } catch {
      res.json({ message: 'Internal Server Error' })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { ano, marca, modelo }: Cars = req.body
      const { id } = req.params
      await prismaClient.carros.update({
        where: { id: Number(id) },
        data: {
          ano,
          marca,
          modelo,
        },
      })
      return res.status(204).end()
    } catch {
      res.json({ message: 'Internal Server Error' })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await prismaClient.carros.delete({
        where: { id: Number(id) },
      })
      res.status(204).end()
    } catch {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
