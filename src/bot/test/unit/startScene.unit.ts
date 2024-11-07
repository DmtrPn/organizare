import { Inject } from 'typescript-ioc';

import { MethodName, SceneTest } from '@core/test/SceneTest';
import { Describe, Test } from '@core/test/decorators/testDecorators';
import { expect } from '@core/test/expect';
import { MainScene } from '@bot/scenes/MainScene';
import { Actions, SceneName } from '@bot/types';
import { IUserCrudService } from '@users/domain/IUserCrudService';

@Describe('Start scene')
export class StartSceneUnit extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new MainScene();

    @Test('On start redirect to main scene')
    public async retreatCreate(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.start, [{ method: MethodName.Start, args: [] }]);

        await this.scene.start(context);

        this.checkReplyMessage(context, 'Привет! Выберите действие:');
        this.checkReplyInlineKeyboard(context, [
            [{ text: 'Создать напоминание', callback_data: Actions.CreateReminder }],
            [{ text: 'Создать встречу', callback_data: Actions.CreateMeeting }],
            [{ text: 'Предстоящие события', callback_data: Actions.ShowUpcomingEvents }],
        ]);
    }

    @Test('Create new user on start')
    public async createUserOnStart(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.start, [{ method: MethodName.Start, args: [] }]);

        await this.scene.start(context);
        const users = await this.crudService.find({ chatId: `${context.getChatId()}` });
        expect(users.length).toEqual(1);
    }

    @Test('Переходим на созданиена поминания')
    public async redirectToCreateReminder(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.onAddReminder, [
            { method: MethodName.Action, args: [Actions.CreateReminder] },
        ]);

        await this.scene.onAddReminder(context);

        this.checkEmptyReply(context);
        this.checkRedirectToScene(context, SceneName.ReminderCreating);
    }

    @Test('redirectToCreateMeetitng')
    public async redirectToCreateMeetitng(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.onCreateMeeting, [
            { method: MethodName.Action, args: [Actions.CreateMeeting] },
        ]);

        await this.scene.onCreateMeeting(context);

        this.checkEmptyReply(context);
        this.checkRedirectToScene(context, SceneName.MeetingCreating);
    }
}
