/*
  Warnings:

  - The primary key for the `player_to_match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `matchId` on the `player_to_match` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `player_to_match` table. All the data in the column will be lost.
  - Added the required column `match_id` to the `player_to_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `player_to_match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "player_to_match" DROP CONSTRAINT "player_to_match_matchId_fkey";

-- DropForeignKey
ALTER TABLE "player_to_match" DROP CONSTRAINT "player_to_match_playerId_fkey";

-- AlterTable
ALTER TABLE "player_to_match" DROP CONSTRAINT "player_to_match_pkey",
DROP COLUMN "matchId",
DROP COLUMN "playerId",
ADD COLUMN     "match_id" INTEGER NOT NULL,
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD CONSTRAINT "player_to_match_pkey" PRIMARY KEY ("player_id", "match_id");

-- AddForeignKey
ALTER TABLE "player_to_match" ADD CONSTRAINT "player_to_match_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_to_match" ADD CONSTRAINT "player_to_match_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
