import { Inject } from 'typescript-ioc';
import { Describe, Test } from 'node-test-decorators';

import { MethodName, SceneTest } from '@core/test/SceneTest';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { MeetingCreateScene } from '@bot/scenes/meeting/meeting.create.scene';

@Describe('Create reminder scene')
export class CreateMeetingSceneUnit extends SceneTest {
    @Inject protected crudService!: IUserCrudService;
    private scene = new MeetingCreateScene();

    @Test()
    public async enterMessage(): Promise<any> {
        const context = this.getContext();
        this.checkMethodMetadata(this.scene.onEnter, [{ method: MethodName.SceneEnter, args: [] }]);

        await this.scene.onEnter(context);

        this.checkReplyMessage(context, 'Введите название встречи:');
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

    //     Пользователь: "Командное собрание"
    // Бот: "Выберите дату и время:"
    //     [Кнопки: Завтра в 10:00, Завтра в 14:00, Ввести вручную]

    // (Пользователь выбирает дату/время)
    // Бот: "Выберите участников:"
    //     [Кнопки с именами пользователей]

    // (Пользователь выбирает участников)
    // Бот: "Ваша встреча: Командное собрание на завтра в 10:00 с участниками [Иван, Мария]. Подтвердить?"
    //     [Кнопки: Подтвердить, Изменить, Отменить];

    //    Запуск создания встречи:

    // Пользователь отправляет команду /create_meeting или нажимает кнопку «Создать встречу».
    // Бот отвечает с запросом ввести название встречи.
    // Ввод названия встречи:

    // Пользователь вводит название.
    // Бот запрашивает дату и время встречи, предлагая кнопки для выбора даты и времени.
    // Выбор даты и времени:

    // Пользователь либо выбирает предложенные варианты (например, «завтра в 10:00», «послезавтра в 14:00»), либо вводит вручную.
    // Бот просит указать участников встречи.
    // Добавление участников:

    // Бот выводит список доступных пользователей (или опцию поиска по имени) и предлагает кнопки для добавления участников.
    // Пользователь выбирает участников из списка, бот добавляет их к встрече и подтверждает выбор.
    // Подтверждение встречи:

    // Бот показывает сводку встречи и предлагает кнопки: «Подтвердить», «Изменить» или «Отменить».
    // При подтверждении встреча создаётся, и бот уведомляет всех участников.

    // @Test('Set retreat start date')
    // public async setStartDate(): Promise<void> {
    //     const context = this.getContext();
    //     this.checkMethodMetadata(this.scene.onText, [{ method: MethodName.On, args: ['text'] }]);
    //     const date = '2043-01-12';
    //     await this.scene.onText(context, date);
    //
    //     this.checkReplyMessage(context, `Введите время напоминания (в формате ЧЧ:ММ):`);
    //     const time = '15:30';
    //     await this.scene.onText(context, time);
    //
    //     this.checkReplyMessage(context, `Введите текст напоминания:`);
    //
    //     const title = 'title';
    //     await this.scene.onText(context, title);
    //
    //     this.checkReplyMessage(context, `Напоминание успешно добавлено!`);
    // }
}
