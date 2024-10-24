import { Ctx, Start, On, Update, Action } from 'nestjs-telegraf';
import { v4 as uuid } from 'uuid';

import { Context } from '@core/types';

import { SceneName, Actions } from '../types';
import { isDefined } from '@utils/isDefined';
import { Inject } from 'typescript-ioc';
import { IUserHandlers } from '../interfaces/IUserHandlers';
import { Markup, Scenes } from 'telegraf';

@Update()
export class MainScene {
    @Inject private userHandlers!: IUserHandlers;

    @Start()
    public async start(@Ctx() ctx: Context): Promise<void> {
        if (isDefined(ctx.from)) {
            await this.userHandlers.createIfNotExist({
                id: uuid(),
                chatId: ctx.from.id,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name || '',
            });
        }
        await ctx.reply(
            'Привет! Выберите действие:',
            Markup.inlineKeyboard([
                [{ text: 'Создать напоминание', callback_data: Actions.AddReminder }],
                [{ text: 'Создать встречу', callback_data: Actions.CreateMeeting }],
                [{ text: 'Предстоящие события', callback_data: Actions.ShowUpcomingEvents }],
            ]),
        );
    }

    @On(['text', 'sticker', 'message'])
    public async onText(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply(
            'Привет! Выберите действие:',
            Markup.inlineKeyboard([
                [{ text: 'Создать напоминание', callback_data: Actions.AddReminder }],
                [{ text: 'Создать встречу', callback_data: Actions.CreateMeeting }],
                [{ text: 'Предстоящие события', callback_data: Actions.ShowUpcomingEvents }],
            ]),
        );
    }

    // Обработка кнопки создания напоминания
    @Action(Actions.AddReminder)
    async onAddReminder(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
        await ctx.scene.enter(SceneName.ReminderAdding); // Переход на сцену создания напоминания
    }

    // Обработка кнопки создания встречи
    @Action(Actions.CreateMeeting)
    async onCreateMeeting(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
        await ctx.scene.enter(SceneName.MeetingCreating); // Переход на сцену создания встречи
    }

    // Обработка кнопки просмотра предстоящих событий
    @Action(Actions.ShowUpcomingEvents)
    async onUpcomingEvents(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply('Вот список ваших предстоящих событий:');
    }
}
