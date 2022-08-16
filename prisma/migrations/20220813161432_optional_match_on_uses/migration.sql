-- DropForeignKey
ALTER TABLE "use_of_play" DROP CONSTRAINT "use_of_play_match_id_fkey";

-- AlterTable
ALTER TABLE "use_of_play" ALTER COLUMN "match_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
