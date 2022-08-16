/*
  Warnings:

  - You are about to drop the `_MatchToPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_B_fkey";

-- DropTable
DROP TABLE "_MatchToPlayer";

-- CreateTable
CREATE TABLE "player_to_match" (
    "playerId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "player_to_match_pkey" PRIMARY KEY ("playerId","matchId")
);

-- AddForeignKey
ALTER TABLE "player_to_match" ADD CONSTRAINT "player_to_match_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_to_match" ADD CONSTRAINT "player_to_match_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
