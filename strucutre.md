/src
/meetings                       // Сущность "Встреча"
/application                   // Логика, связанная с приложением
create-meeting.handler.ts    // Хендлер команды создания встречи
update-meeting.handler.ts    // Хендлер команды изменения встречи
/domain                        // Бизнес-логика (в центре)
meeting.entity.ts            // Сущность "Встреча"
meeting.service.ts           // Сервис для управления встречами
/infrastructure                // Инфраструктурный слой
meeting.repository.ts        // Репозиторий для работы с базой данных
notification.service.ts      // Сервис для уведомлений о встречах

/teams                          // Сущность "Команда"
/application
create-team.handler.ts       // Хендлер команды создания команды
join-team.handler.ts         // Хендлер для присоединения к команде
/domain
team.entity.ts               // Сущность "Команда"
team.service.ts              // Логика для управления командой
/infrastructure
team.repository.ts           // Репозиторий для работы с командами

/users                          // Сущность "Пользователь"
/application
register-user.handler.ts     // Хендлер для регистрации пользователей
/domain
user.entity.ts               // Сущность "Пользователь"
user.service.ts              // Сервис для работы с пользователями
/infrastructure
user.repository.ts           // Репозиторий для хранения пользователей