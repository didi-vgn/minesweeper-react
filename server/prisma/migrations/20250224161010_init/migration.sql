-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "userId" TEXT NOT NULL,
    "levelsCompleted" INTEGER NOT NULL DEFAULT 0,
    "bombsScanned" INTEGER NOT NULL DEFAULT 0,
    "totalGems" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "pinkGames" INTEGER NOT NULL DEFAULT 0,
    "blueGames" INTEGER NOT NULL DEFAULT 0,
    "whiteGames" INTEGER NOT NULL DEFAULT 0,
    "yellowGames" INTEGER NOT NULL DEFAULT 0,
    "greenGames" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_userId_key" ON "Stats"("userId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
