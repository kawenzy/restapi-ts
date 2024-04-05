::#region


::install pkg
@echo off
set bundle=npm install
::new display bundle install
echo running  bundle install
start %bundle%

::run server
@echo off
set serve=npm run dev
::new display for serve
echo  starting the server
start %serve%

@echo off
set studio=npx prisma studio
::new display for Prisma Studio
echo starting studio...
start  %studio%

:end