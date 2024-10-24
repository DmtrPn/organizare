import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { IReminderCrudService } from '@reminder/domain/IReminderCrudService';
import { getFakeReminderCreationParams, getFakeReminderUpdateParams } from '@reminder/test/utils/reminderFakeData';
import { FakeParams } from '@core/test/FakeParams';
import { getFakeUserCreationParams } from '@users/use-case/test/utils/userFakeData';
import { createUser } from '@users/use-case/UserCreateCommand';

@Describe()
export class ReminderCrudServiceTestSpec {
    @Inject private crudService!: IReminderCrudService;

    private chatId = FakeParams.getInteger({ min: 0, max: 1000 });

    @BeforeAll()
    public async init(): Promise<void> {
        const params = getFakeUserCreationParams({ chatId: this.chatId });
        await createUser(params);
    }

    @Test('Create')
    public async create(): Promise<void> {
        const data = getFakeReminderCreationParams({ chatId: this.chatId });
        await this.crudService.create(data);
        const reminder = await this.crudService.getById(data.id);

        expect(reminder).toBeDefined();
        expect(reminder).toEqual({ ...data, createdAt: reminder!.createdAt });
    }

    @Test('Update')
    public async update(): Promise<void> {
        const data = getFakeReminderCreationParams({ chatId: this.chatId });
        await this.crudService.create(data);
        const updateData = getFakeReminderUpdateParams();
        await this.crudService.update(data.id, updateData);
        const reminder = await this.crudService.getById(data.id);

        expect(reminder!.title).toBe(updateData.title);
        expect(reminder!.description).toBe(updateData.description);
        expect(reminder!.date.toISOString()).toBe(updateData.date!.toISOString());
    }
}
