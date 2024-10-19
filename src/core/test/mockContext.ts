import { Context as TelegramContext, Telegram } from 'telegraf';

import { MockContext } from './types';
import { FakeParams } from './FakeParams';

export function makeMockContext(update: object = {}, contextExtra = {}): MockContext {
    const tg = new Telegram('', {});
    // @ts-ignore
    tg.callApi = (method, data) => {
        console.log(`mocked tg callApi ${method}`, data);
    };
    const from = {
        id: FakeParams.getInteger(),
        first_name: FakeParams.getName(),
        last_name: FakeParams.getName(),
    };

    // @ts-ignore
    const ctx: MockContext = new TelegramContext(update, tg, {});
    Object.assign(
        ctx,
        {
            update: { chat_member: { from } },
            session: {},
            debug: {
                currentScene: '',
                reply: {},
                // replyMessages: () => ctx.debug.replies.map(({ message }) => message),
            },
        },
        contextExtra,
    );

    // prettier-ignore
    //  @ts-ignore
    ctx.reply = (message, extra = undefined) => { ctx.debug.reply = { message, extra }; };

    // @ts-ignore
    ctx.scene = {
        // prettier-ignore
        // @ts-ignore
        enter: sceneName => { ctx.debug.currentScene = sceneName; },
        // prettier-ignore
        // @ts-ignore
        leave: () => { ctx.debug.currentScene = ''; },
    };

    // @ts-ignore
    ctx.getChat = () => from;

    ctx.getChatId = () => from.id;

    return ctx;
}
