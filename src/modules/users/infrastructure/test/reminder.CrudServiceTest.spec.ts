import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';
import { Describe, Test, expect } from 'node-test-decorators';

import { IReminderCrudService } from '@users/domain/IReminderCrudService';
import { getFakeReminderCreationParams, getFakeReminderUpdateParams } from '@users/test/utils/reminderFakeData';
import { IntegrationTest } from '@core/test/IntegrationTest';

@Describe()
export class ReminderCrudServiceTestSpec extends IntegrationTest {
    @Inject private crudService!: IReminderCrudService;

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
