"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/cars/CarsControllers.ts
var CarsControllers_exports = {};
__export(CarsControllers_exports, {
  CarControllers: () => CarControllers
});
module.exports = __toCommonJS(CarsControllers_exports);

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/controllers/cars/CarsControllers.ts
var CarControllers = class {
  async create(req, res) {
    try {
      const { ano, marca, modelo } = req.body;
      await prismaClient.carros.create({
        data: {
          ano,
          marca,
          modelo
        }
      });
      res.status(201);
    } catch {
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }
  async getAll(req, res) {
    try {
      const allCars = await prismaClient.carros.findMany();
      res.json(allCars);
    } catch {
      res.json({ message: "Internal Server Error" });
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const carsId = await prismaClient.carros.findUnique({
        where: { id: Number(id) }
      });
      res.json(carsId);
    } catch {
      res.json({ message: "Internal Server Error" });
    }
  }
  async update(req, res) {
    try {
      const { ano, marca, modelo } = req.body;
      const { id } = req.params;
      await prismaClient.carros.update({
        where: { id: Number(id) },
        data: {
          ano,
          marca,
          modelo
        }
      });
      return res.status(204);
    } catch {
      res.json({ message: "Internal Server Error" });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    await prismaClient.carros.delete({
      where: { id: Number(id) }
    });
    res.status(204);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CarControllers
});
