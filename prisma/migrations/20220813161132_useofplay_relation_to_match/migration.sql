/*
  Warnings:

  - Added the required column `match_id` to the `use_of_play` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "use_of_play" ADD COLUMN     "match_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
