import { MethodName, SceneTest } from '@core/test/SceneTest';

import { MainScene } from '../../scenes/MainScene';
import { SceneName } from '../../types';

@Describe('Main scene')
export class MainSceneTest extends SceneTest {
    private scene = new MainScene();

    @Test('On enter show start button and welcome message')
    public async retreatCreate(): Promise<any> {
        this.checkMethodMetadata(this.scene.onSceneEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onSceneEnter(this.context as any);

        this.checkReplyMessage('Добро пожаловать');
        this.checkReplyKeyboard('🌺Начать ретрит', true);
    }

    @Test('On leave replay with sticker')
    public async leaveTest(): Promise<void> {
        this.checkMethodMetadata(this.scene.onSceneLeave, [{ method: MethodName.SceneLeave, args: [] }]);

        await this.scene.onSceneLeave(this.context);
        this.checkReplyMessage('🌞');
    }

    @Test('Redirect to start retreat on action startRetreat')
    public async startRetreat(): Promise<void> {
        this.checkMethodMetadata(this.scene.startRetreat, [
            { method: MethodName.Action, args: ['startRetreat'] },
            { method: MethodName.Hears, args: ['🌺Начать ретрит'] },
        ]);

        await this.scene.startRetreat(this.context);
        this.checkRedirectToScene(SceneName.CreateRetreat);
    }

    @Test('Show message and inline keyboard on any text')
    public async onTextTest(): Promise<void> {
        this.checkMethodMetadata(this.scene.onText, [{ method: MethodName.On, args: ['text'] }]);

        await this.scene.onText(this.context);
        this.checkReplyMessage('Жизнь неожиданна прекрасна');
        this.checkReplyInlineKeyboard([
            [
                {
                    text: '🌺Начать ретрит',
                    callback_data: 'startRetreat',
                    hide: false,
                },
            ],
        ]);
    }
}
