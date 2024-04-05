/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Todolist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Todolist_title_key" ON "Todolist"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
