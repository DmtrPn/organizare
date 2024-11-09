import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, Message, SceneLeave, On } from 'nestjs-telegraf';
import { Context } from '@core/types';

import { SceneName } from '@bot/types';

interface SceneData {
    date?: Date;
    title?: string;
    description?: string;
    timeIsSet: boolean;
}

@Scene(SceneName.MeetingCreating)
@Injectable()
export class MeetingCreateScene {
    @SceneEnter()
    public async onEnter(@Ctx() ctx: Context<SceneData>): Promise<void> {
        await ctx.reply('Введите название встречи:');
        ctx.session.currentData = { timeIsSet: false };
    }

    @On('text')
    public async onText(@Ctx() ctx: Context<SceneData>, @Message('text') message: string): Promise<void> {
        ctx.session.currentData = ctx.session.currentData ?? { timeIsSet: false };

        // if (!ctx.session.currentData.date) {
        //     await this.handleDateInput(ctx, message);
        // } else if (!ctx.session.currentData.timeIsSet) {
        //     await this.handleTimeInput(ctx, message);
        // } else if (!ctx.session.currentData.title) {
        //     await this.handleTitleInput(ctx, message);
        // }
    }

    @SceneLeave()
    public async onLeave(@Ctx() ctx: Context): Promise<void> {
        ctx.session.currentData = null;
    }
}
