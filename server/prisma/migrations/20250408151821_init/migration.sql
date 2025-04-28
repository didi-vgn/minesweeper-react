/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "bestDepth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "extraTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mostGemsCollected" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "noScanWins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "teleports" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Game";

-- DropEnum
DROP TYPE "GameMode";

-- CreateTable
CREATE TABLE "ClassicScore" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "difficulty" "Difficulty" NOT NULL,
    "time" TEXT NOT NULL,
    "bbbv" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "board" JSONB NOT NULL,
    "playedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassicScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonScore" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "points" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "playedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DungeonScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassicScore" ADD CONSTRAINT "ClassicScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DungeonScore" ADD CONSTRAINT "DungeonScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
