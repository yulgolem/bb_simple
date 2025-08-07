-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Context" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Context_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Phrase" (
    "id" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Phrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vote" (
    "id" TEXT NOT NULL,
    "phraseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BoardCell" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "phraseText" TEXT NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "marked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BoardCell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Context_tag_key" ON "public"."Context"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_phraseId_userId_key" ON "public"."Vote"("phraseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_contextId_userId_key" ON "public"."Board"("contextId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardCell_boardId_row_col_key" ON "public"."BoardCell"("boardId", "row", "col");

-- AddForeignKey
ALTER TABLE "public"."Phrase" ADD CONSTRAINT "Phrase_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "public"."Context"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_phraseId_fkey" FOREIGN KEY ("phraseId") REFERENCES "public"."Phrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "public"."Context"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BoardCell" ADD CONSTRAINT "BoardCell_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

