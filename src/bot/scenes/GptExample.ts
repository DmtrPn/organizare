import { Injectable } from '@nestjs/common';
import { Command, Ctx, Action } from 'nestjs-telegraf';
import { Context, Scenes } from 'telegraf';

@Injectable()
export class BotService {
    // Команда для отображения главного меню
    @Command('start')
    async startCommand(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('Привет! Выберите действие:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Создать напоминание', callback_data: 'add_reminder' }],
                    [{ text: 'Создать встречу', callback_data: 'create_meeting' }],
                    [{ text: 'Предстоящие события', callback_data: 'upcoming_events' }],
                ],
            },
        });
    }

    // Обработка кнопки создания напоминания
    @Action('add_reminder')
    async onAddReminder(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.scene.enter('addReminderScene'); // Переход на сцену создания напоминания
    }

    // Обработка кнопки создания встречи
    @Action('create_meeting')
    async onCreateMeeting(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.scene.enter('createMeetingScene'); // Переход на сцену создания встречи
    }

    // Обработка кнопки просмотра предстоящих событий
    @Action('upcoming_events')
    async onUpcomingEvents(@Ctx() ctx: Context) {
        await ctx.reply('Вот список ваших предстоящих событий:');
        // Можно вывести список событий из базы данных
    }
}
