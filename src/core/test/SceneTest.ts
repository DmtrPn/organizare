import './unitTestRanner';
import orderBy from 'lodash/orderBy';

import { expect } from 'node-test-decorators';

import { makeMockContext } from './mockContext';
import { InlineKeyboardMarkup, InlineKeyboardMarkupParams, MockContext, ReplyKeyboardMarkup } from './types';
import { SceneName } from '../../bot/types';

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
    protected setMessageToContext(message: string): MockContext {
        return makeMockContext({ message: { text: message, chat: { id: 1234 } } });
    }

    protected getContext(): MockContext {
        return makeMockContext();
    }

    protected checkMethodMetadata(target: object, metadata: ListenerMetadata[]): void {
        expect(orderBy(Reflect.getMetadata('LISTENERS_METADATA', target), 'method')).toEqual(
            orderBy(metadata, 'method'),
        );
    }

    protected checkRedirectToScene(context: MockContext, scene: SceneName): void {
        expect(context.debug.currentScene).toBe(scene);
    }

    protected checkEmptyReply(context: MockContext): void {
        expect(context.debug.reply).toEqual({});
    }

    protected checkReplyMessage(context: MockContext, message: string): void {
        expect(context.debug.reply.message).toBe(message);
    }

    protected checkReplyInlineKeyboard(context: MockContext, params: InlineKeyboardMarkupParams[][]): void {
        expect(context.debug.reply.extra).toBeDefined();

        const inlineKeyboard = (context.debug.reply.extra!.reply_markup as InlineKeyboardMarkup)!.inline_keyboard;

        expect(params.length).toEqual(inlineKeyboard.length);
        params.forEach((keyboards, index) => {
            expect(keyboards.length).toEqual(inlineKeyboard[index].length);
            expect(orderBy(keyboards, 'text')).toEqual(orderBy(inlineKeyboard[index], 'text'));
        });
    }

    protected checkReplyKeyboard(context: MockContext, keyboard: string, resize?: boolean): void {
        expect(context.debug.reply.extra).toBeDefined();

        // eslint-disable-next-line
        const reply_markup = context.debug.reply.extra!.reply_markup as ReplyKeyboardMarkup;

        expect(reply_markup).toBeDefined();
        expect(reply_markup.keyboard[0][0]).toBe(keyboard);
        expect(reply_markup.resize_keyboard).toBe(resize);
    }
}
