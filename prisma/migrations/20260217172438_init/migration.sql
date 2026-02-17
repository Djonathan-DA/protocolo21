-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklists" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "tasks" BOOLEAN[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_user_id_day_key" ON "user_progress"("user_id", "day");

-- CreateIndex
CREATE UNIQUE INDEX "checklists_user_id_day_key" ON "checklists"("user_id", "day");
