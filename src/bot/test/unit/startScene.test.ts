import { Inject } from 'typescript-ioc';
import { MethodName, SceneTest } from '@core/test/SceneTest';

import { MainScene } from '@bot/scenes/MainScene';
import { Actions } from '@bot/types';
import { IUserCrudService } from '@users/domain/IUserCrudService';

@Describe('Start scene')
export class StartSceneTest extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new MainScene();

    @Test('On start redirect to main scene')
    public async retreatCreate(): Promise<any> {
        this.checkMethodMetadata(this.scene.start, [{ method: MethodName.Start, args: [] }]);

        await this.scene.start(this.context);

        this.checkReplyMessage('Привет! Выберите действие:');
        this.checkReplyInlineKeyboard([
            [{ text: 'Создать напоминание', callback_data: Actions.AddReminder }],
            [{ text: 'Создать встречу', callback_data: Actions.CreateMeeting }],
            [{ text: 'Предстоящие события', callback_data: Actions.ShowUpcomingEvents }],
        ]);
    }

    @Test('Create new user on start')
    public async createUserOnStart(): Promise<any> {
        this.checkMethodMetadata(this.scene.start, [{ method: MethodName.Start, args: [] }]);

        await this.scene.start(this.context);
        const users = await this.crudService.find({ chatId: `${this.context.getChatId()}` });
        expect(users.length).toEqual(1);
    }

    // @Test('On help redirect to main scene')
    // public async helpRedirectToMainScene(): Promise<any> {
    //     this.checkMethodMetadata(this.scene.help, [{ method: MethodName.Help, args: [] }]);
    //
    //     await this.scene.help(this.context);
    //
    //     this.checkEmptyReply();
    //     this.checkRedirectToScene(SceneName.Main);
    // }
    //
    // @Test('On help redirect to main scene')
    // public async yextRedirectToMain(): Promise<any> {
    //     this.checkMethodMetadata(this.scene.onText, [
    //         { method: MethodName.On, args: [['text', 'sticker', 'message']] },
    //     ]);
    //
    //     await this.scene.onText(this.context);
    //
    //     this.checkEmptyReply();
    //     this.checkRedirectToScene(SceneName.Main);
    // }
}
