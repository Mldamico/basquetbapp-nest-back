-- AlterTable
ALTER TABLE "use_of_play" ADD COLUMN     "center_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "point_guard_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "power_forward_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "shooting_guard_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "small_forward_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_shooting_guard_id_fkey" FOREIGN KEY ("shooting_guard_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_point_guard_id_fkey" FOREIGN KEY ("point_guard_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_small_forward_id_fkey" FOREIGN KEY ("small_forward_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_power_forward_id_fkey" FOREIGN KEY ("power_forward_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
