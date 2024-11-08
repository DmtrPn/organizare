import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { Context } from '@core/types';

import { SceneName } from '@bot/types';

interface SceneData {}

@Scene(SceneName.MeetingCreating)
@Injectable()
export class MeetingCreateScene {
    @SceneEnter()
    public async onEnter(@Ctx() ctx: Context<SceneData>) {
        await ctx.reply('Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
        ctx.session.currentData = { timeIsSet: false };
    }

    @SceneLeave()
    public async onLeave(@Ctx() ctx: Context) {
        ctx.session.currentData = null;
    }
}
