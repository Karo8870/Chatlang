-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "room" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
