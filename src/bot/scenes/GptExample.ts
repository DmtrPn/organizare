import { Injectable } from '@nestjs/common';
import { Command, Ctx, Action, Hears, On } from 'nestjs-telegraf';
import { Context, Scenes, Markup } from 'telegraf';

@Injectable()
export class BotService {
    // Команда для отображения главного меню
    @Command('start')
    async startCommand(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
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

    @On('text')
    public async onText(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply(
            'Жизнь неожиданна прекрасна',
            Markup.inlineKeyboard([Markup.button.callback('🌺Начать ретрит', 'startRetreat')]),
        );
    }

    // Обработка кнопки создания напоминания
    @Action('add_reminder')
    @Hears('🌺Начать ретрит')
    async onAddReminder(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
        await ctx.reply(
            'Введите дату начала в формате ДД.ММ.ГГГГ \nПример: 01.08.2034',
            Markup.keyboard([['🔙Вернуться']]).resize(),
        );
    }

    // Обработка кнопки создания встречи
    @Action('create_meeting')
    async onCreateMeeting(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
        await ctx.scene.enter('createMeetingScene'); // Переход на сцену создания встречи
    }

    // Обработка кнопки просмотра предстоящих событий
    @Action('upcoming_events')
    async onUpcomingEvents(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply('Вот список ваших предстоящих событий:');
        // Можно вывести список событий из базы данных
    }
}
