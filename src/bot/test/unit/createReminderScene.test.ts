import { Inject } from 'typescript-ioc';
import { MethodName, SceneTest } from '@core/test/SceneTest';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { ReminderCreateScene } from '@bot/scenes/ReminderCreateScene';

@Describe('Create reminder scene')
export class CreateReminderSceneTest extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new ReminderCreateScene();

    @Test()
    public async retreatCreate(): Promise<any> {
        this.checkMethodMetadata(this.scene.onEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onEnter(this.context as any);

        this.checkReplyMessage('Введите дату напоминания (в формате ГГГГ-ММ-ДД):');
    }
}
