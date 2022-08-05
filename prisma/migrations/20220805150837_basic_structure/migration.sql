/*
  Warnings:

  - Added the required column `name` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shooterPosition` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlPlay` to the `Play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quarter` to the `UseOfPlay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scored` to the `UseOfPlay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `UseOfPlay` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Position" AS ENUM ('BASE', 'ESCOLTA', 'ALERO', 'ALEPIVOT', 'PIVOT');

-- AlterTable
ALTER TABLE "Play" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "assistPosition" "Position",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "shooterPosition" "Position" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "urlPlay" TEXT NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UseOfPlay" ADD COLUMN     "quarter" INTEGER NOT NULL,
ADD COLUMN     "scored" BOOLEAN NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swap" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" "Position" NOT NULL,
    "quarter" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "timePlaying" INTEGER NOT NULL,

    CONSTRAINT "Swap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
