-- CreateEnum
CREATE TYPE "PlayerSymbol" AS ENUM ('X', 'O');

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "playerX" TEXT NOT NULL,
    "playerO" TEXT NOT NULL,
    "winner" "PlayerSymbol" NOT NULL,
    "boardState" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);
