import { Ctx, Help, Start, On, Update } from 'nestjs-telegraf';
import { v4 as uuid } from 'uuid';

import { BotAuditEventType, botAuditLogService } from '@components/auditLog/BotAuditLogService';
import { Context } from '@core/types';

import { createUser } from '@retreat/use-case/user/UserCreateCommand';

import { SceneName } from './types';
import { isDefined } from '@utils/isDefined';

@Update()
export class StartScene {
    @Start()
    public async start(@Ctx() ctx: Context) {
        this.logEvent(ctx, BotAuditEventType.Start);
        if (isDefined(ctx.from)) {
            await createUser({
                ifNotExist: true,
                id: uuid(),
                chatId: ctx.from.id,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name || '',
            });
        }
        await ctx.scene.enter(SceneName.Main);
    }

    @Help()
    public async help(@Ctx() ctx: Context) {
        await ctx.scene.enter(SceneName.Main);
    }

    @On(['text', 'sticker', 'message'])
    public async onText(@Ctx() ctx: Context) {
        await ctx.scene.enter(SceneName.Main);
    }

    private logEvent(ctx: Context, eventType: BotAuditEventType, data: object = {}): void {
        const from = ctx.message?.from ?? ctx.callbackQuery?.from;

        if (from) {
            botAuditLogService.logEvent({
                eventType,
                userId: `${from.id}`,
                data: {
                    ...data,
                    username: from.username,
                    firstName: from.first_name,
                },
            });
        }
    }
}
