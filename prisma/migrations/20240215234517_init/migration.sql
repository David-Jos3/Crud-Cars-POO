-- CreateTable
CREATE TABLE "carro" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "modelo" VARCHAR(100) NOT NULL,
    "marca" VARCHAR(100) NOT NULL,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("id")
);
