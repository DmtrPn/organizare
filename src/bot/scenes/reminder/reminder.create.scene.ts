import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { Context } from '@core/types';

import { SceneName } from '@bot/types';
import { DateFormat, DateHelper } from '@utils/DateHelper';
import { Inject } from 'typescript-ioc';
import { IReminderHandlers } from '@bot/interfaces/IReminderHandlers';
import { v4 as uuid } from 'uuid';

interface SceneData {
    date?: Date;
    title?: string;
    description?: string;
    timeIsSet: boolean;
}

@Scene(SceneName.ReminderCreating)
@Injectable()
export class ReminderCreateScene {
    @Inject private reminderHandlers!: IReminderHandlers;

    @SceneEnter()
    public async onEnter(@Ctx() ctx: Context<SceneData>): Promise<void> {
        await ctx.reply('Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
        ctx.session.currentData = { timeIsSet: false };
    }

    @On('text')
    public async onText(@Ctx() ctx: Context<SceneData>, @Message('text') message: string): Promise<void> {
        ctx.session.currentData = ctx.session.currentData ?? { timeIsSet: false };

        if (!ctx.session.currentData.date) {
            await this.handleDateInput(ctx, message);
        } else if (!ctx.session.currentData.timeIsSet) {
            await this.handleTimeInput(ctx, message);
        } else if (!ctx.session.currentData.title) {
            await this.handleTitleInput(ctx, message);
        }
    }

    @SceneLeave()
    public async onLeave(@Ctx() ctx: Context): Promise<void> {
        ctx.session.currentData = null; // Очищаем данные сессии после завершения
    }

    private async handleDateInput(ctx: Context<SceneData>, message: string): Promise<void> {
        const startDate = DateHelper.createDate(message, DateFormat.DateWithDashSeparator);

        if (startDate.toString() === 'Invalid Date') {
            await ctx.reply('Пожалуйста, введите дату в формате ГГГГ-ММ-ДД');
        } else if (DateHelper.isBefore(startDate, new Date())) {
            await ctx.reply('Пожалуйста, введите дату в формате ГГГГ-ММ-ДД');
        } else {
            ctx.session.currentData!.date = startDate;
            await ctx.reply('Введите время напоминания (в формате ЧЧ:ММ):');
        }
    }

    private async handleTimeInput(ctx: Context<SceneData>, message: string): Promise<void> {
        if (!DateHelper.isTimeValid(message)) {
            await ctx.reply('Пожалуйста, введите время в формате ЧЧ:ММ');
        } else {
            const [hour, minutes] = message.split(':').map(Number);
            ctx.session.currentData!.date = DateHelper.setDate(ctx.session.currentData!.date!, {
                hour,
                minutes,
            });
            ctx.session.currentData!.timeIsSet = true;
            await ctx.reply('Введите текст напоминания:');
        }
    }

    private async handleTitleInput(ctx: Context<SceneData>, message: string): Promise<void> {
        ctx.session.currentData!.title = message;
        await ctx.reply(
            `Ваше напоминание:\nДата: ${
                ctx.session.currentData!.date
            }\nВремя: ${ctx.session.currentData!.date!.toLocaleDateString()}\nТекст: ${ctx.session.currentData!.title}`,
        );

        await this.createReminder(`${ctx.from!.id}`, ctx.session.currentData! as Required<SceneData>);

        await ctx.reply('Напоминание успешно добавлено!');
        await ctx.scene.leave();
    }

    private async createReminder(chatId: string, { date, title }: Required<SceneData>): Promise<void> {
        await this.reminderHandlers.create({
            chatId,
            date,
            title,
            description: undefined,
            id: uuid(),
        });
    }
}
