"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/router.ts
var router_exports = {};
__export(router_exports, {
  routers: () => routers
});
module.exports = __toCommonJS(router_exports);
var import_express = __toESM(require("express"));

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

// src/routes/router.ts
var carControllers = new CarControllers();
var Routers = class {
  constructor() {
    this.router = import_express.default.Router();
    this.getAllCars();
    this.createCars();
    this.getCarsById();
    this.routerInitialization();
  }
  routerInitialization() {
    this.router.get("/", (req, res) => {
      res.json({ message: "S\xF3 funciona com reza braba" });
    });
  }
  createCars() {
    this.router.post("/cars", carControllers.create);
  }
  getAllCars() {
    this.router.get("/cars", carControllers.getAll);
  }
  getCarsById() {
    this.router.get("/cars/:id", carControllers.getById);
  }
};
var routers = new Routers();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routers
});
