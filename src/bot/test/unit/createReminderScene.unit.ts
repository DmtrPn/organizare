import { Inject } from 'typescript-ioc';
import { Describe, Test } from 'node-test-decorators';
import { MethodName, SceneTest } from '@core/test/SceneTest';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { ReminderCreateScene } from '@bot/scenes/reminder/reminder.create.scene';

@Describe('Create reminder scene')
export class CreateReminderSceneUnit extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new ReminderCreateScene();

    @Test('enterMessage')
    public async enterMessage(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.onEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onEnter(context);

        this.checkReplyMessage(context, 'Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
    }

    @Test('Set retreat start date')
    public async setStartDate(): Promise<void> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.onText, [{ method: MethodName.On, args: ['text'] }]);
        const date = '2043-01-12';
        await this.scene.onText(context, date);

        this.checkReplyMessage(context, `Введите время напоминания (в формате ЧЧ:ММ):`);
        const time = '15:30';
        await this.scene.onText(context, time);

        this.checkReplyMessage(context, `Введите текст напоминания:`);

        const title = 'title';
        await this.scene.onText(context, title);

        this.checkReplyMessage(context, `Напоминание успешно добавлено!`);
    }
}
