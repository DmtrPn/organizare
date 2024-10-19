import './unitTestRanner';
import orderBy from 'lodash/orderBy';

import { makeMockContext } from './mockContext';
import { InlineKeyboardMarkup, InlineKeyboardMarkupParams, ReplyKeyboardMarkup } from './types';
import { SceneName } from '@retreat/application/types';

interface ListenerMetadata {
    method: MethodName;
    args: string[] | string[][];
}

export enum MethodName {
    Start = 'start',
    On = 'on',
    Command = 'command',
    Hears = 'hears',
    Help = 'help',
    Action = 'action',
    SceneLeave = 'leave',
    SceneEnter = 'enter',
}

export abstract class SceneTest {
    protected context = makeMockContext();

    @BeforeEach()
    public async beforeEach() {
        this.context = makeMockContext({ message: { chat: { id: 1234 } } });
    }

    protected setMessageToContext(message: string): void {
        this.context = makeMockContext({ message: { text: message, chat: { id: 1234 } } });
    }

    protected checkMethodMetadata(target: object, metadata: ListenerMetadata[]): void {
        expect(orderBy(Reflect.getMetadata('LISTENERS_METADATA', target), 'method')).toStrictEqual(
            orderBy(metadata, 'method'),
        );
    }

    protected checkRedirectToScene(scene: SceneName): void {
        expect(this.context.debug.currentScene).toBe(scene);
    }

    protected checkEmptyReply(): void {
        expect(this.context.debug.reply).toEqual({});
    }

    protected checkReplyMessage(message: string): void {
        expect(this.context.debug.reply.message).toBe(message);
    }

    protected checkReplyInlineKeyboard(params: InlineKeyboardMarkupParams[][]): void {
        expect(this.context.debug.reply.extra).toBeDefined();

        const inlineKeyboard = (this.context.debug.reply.extra!.reply_markup as InlineKeyboardMarkup)!.inline_keyboard;

        expect(params.length).toEqual(inlineKeyboard.length);
        params.forEach((keyboards, index) => {
            expect(keyboards.length).toEqual(inlineKeyboard[index].length);
            expect(orderBy(keyboards, 'text')).toStrictEqual(orderBy(inlineKeyboard[index], 'text'));
        });
    }

    protected checkReplyKeyboard(keyboard: string, resize?: boolean): void {
        expect(this.context.debug.reply.extra).toBeDefined();

        // eslint-disable-next-line
        const reply_markup = this.context.debug.reply.extra!.reply_markup as ReplyKeyboardMarkup;

        expect(reply_markup).toBeDefined();
        expect(reply_markup.keyboard[0][0]).toBe(keyboard);
        expect(reply_markup.resize_keyboard).toBe(resize);
    }
}
