-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "solWalletID" TEXT,
    "inrWalletID" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "INRwallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "INRwallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolWallet" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SolWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "INRwallet_userId_key" ON "INRwallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SolWallet_userId_key" ON "SolWallet"("userId");

-- AddForeignKey
ALTER TABLE "INRwallet" ADD CONSTRAINT "INRwallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolWallet" ADD CONSTRAINT "SolWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
