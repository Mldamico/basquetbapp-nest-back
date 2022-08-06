-- CreateEnum
CREATE TYPE "Role" AS ENUM ('player', 'trainer', 'assistant');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('base', 'escolta', 'alerto', 'ala pivot', 'pivot');

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "disable" BOOLEAN NOT NULL DEFAULT false,
    "type" "Role" NOT NULL DEFAULT 'player',
    "shirt_number" INTEGER,
    "photo" TEXT,
    "team_id" INTEGER,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "play" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instruction" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "shooterPosition" "Position" NOT NULL,
    "assistPosition" "Position",
    "point" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "play_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opponent" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "opponent_score" INTEGER NOT NULL,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "use_of_play" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quarter" INTEGER NOT NULL,
    "scored" BOOLEAN NOT NULL,
    "value" INTEGER NOT NULL,
    "play_id" INTEGER NOT NULL,
    "scorer_id" INTEGER NOT NULL,
    "assister_id" INTEGER NOT NULL,

    CONSTRAINT "use_of_play_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swap" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" "Position" NOT NULL,
    "quarter" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "time_playing" INTEGER NOT NULL,
    "entering_player_id" INTEGER NOT NULL,
    "leaving_player_id" INTEGER NOT NULL,
    "match_id" INTEGER NOT NULL,

    CONSTRAINT "swap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "player_email_key" ON "player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchToPlayer_AB_unique" ON "_MatchToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchToPlayer_B_index" ON "_MatchToPlayer"("B");

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "use_of_play_play_id_fkey" FOREIGN KEY ("play_id") REFERENCES "play"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "scorer_fk" FOREIGN KEY ("scorer_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_of_play" ADD CONSTRAINT "assister_fk" FOREIGN KEY ("assister_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "entering_player" FOREIGN KEY ("entering_player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "leaving_player" FOREIGN KEY ("leaving_player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "swap_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToPlayer" ADD CONSTRAINT "_MatchToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToPlayer" ADD CONSTRAINT "_MatchToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
