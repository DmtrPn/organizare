import { Injectable } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, On } from 'nestjs-telegraf';
import { Context } from '@core/types';

import { SceneName } from '@bot/types';

@Scene(SceneName.ReminderAdding) // Указываем имя сцены
@Injectable()
export class AddReminderScene {
    @SceneEnter() // Метод выполняется, когда пользователь заходит на сцену
    public async onSceneEnter(ctx: Context): Promise<void> {
        await ctx.reply('Введите текст напоминания:');
    }

    // Обработка ввода текста напоминания
    @On('text')
    async onText(@Ctx() ctx: Context) {
        const reminderText = ctx.message!;
        // Логика сохранения напоминания в базе данных
        await ctx.reply(`Напоминание "${reminderText}" создано!`);
        await ctx.scene.leave(); // Выходим из сцены
    }
}
