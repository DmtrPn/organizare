import { Inject } from 'typescript-ioc';
import { Describe, Test } from '@core/test/decorators/testDecorators';
import { MethodName, SceneTest } from '@core/test/SceneTest';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { ReminderCreateScene } from '@bot/scenes/ReminderCreateScene';

@Describe('Create reminder scene')
export class CreateReminderSceneUnit extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new ReminderCreateScene();

    @Test('enterMessage')
    public async enterMessage(): Promise<any> {
        this.checkMethodMetadata(this.scene.onEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onEnter(this.context);

        this.checkReplyMessage('Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
    }

    @Test('onText')
    public async onText(): Promise<any> {
        this.checkMethodMetadata(this.scene.onEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onEnter(this.context);

        this.checkReplyMessage('Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
    }

    @Test('Set retreat start date')
    public async setStartDate(): Promise<void> {
        this.checkMethodMetadata(this.scene.onText, [{ method: MethodName.On, args: ['text'] }]);
        const date = '2043-01-12';
        await this.scene.onText(this.context, date);

        this.checkReplyMessage(`Введите время напоминания (в формате ЧЧ:ММ):`);
        const time = '15:30';
        await this.scene.onText(this.context, time);

        this.checkReplyMessage(`Введите текст напоминания:`);

        const title = 'title';
        await this.scene.onText(this.context, title);

        this.checkReplyMessage(`Напоминание успешно добавлено!`);
    }
}
