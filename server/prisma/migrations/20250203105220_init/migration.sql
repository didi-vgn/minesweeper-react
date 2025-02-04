/*
  Warnings:

  - Added the required column `board` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "board" JSONB NOT NULL;
