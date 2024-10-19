#### Description

Telegram bot for create one retreat. After creating a retreat, the user will receive reminders the day before and on the day of the retreat.  
Schedule is configurable via config `notification -> retreatMessages` 

#### Features

*[x] Save user data
*[x] Create retreat on future date
*[ ] Cancel future retreat
*[ ] Set custom timezone
*[ ] Add different type of retreat

#### For start.
1. Create telegram bot
2. set TB_TOKEN to `.env`
3. `yarn --pure-lockfile`
4. `yarn build`
5. `yarn start`

For localhost tunnel you can use
http://localtunnel.github.io/www/


Create database: TOTO not actual
```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database hmf owner gorod encoding 'UTF8' lc_collate 'ru_RU.utf8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
or
psql -c "create database hmf owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres


test db
psql -c "create database hmf_test owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```