-- CreateTable
CREATE TABLE "Adventure_Progress" (
    "id" SERIAL NOT NULL,
    "levelId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "collectedGems" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Adventure_Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adventure_Progress" ADD CONSTRAINT "Adventure_Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
