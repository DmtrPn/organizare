import { List } from '@core/test/abstract/List';
import { ReminderCreateData, ReminderData, ReminderFindOptions } from '@users/domain/reminder.types';

export class ReminderList extends List<ReminderData, ReminderCreateData, ReminderFindOptions> {
    protected override create(params: ReminderCreateData): ReminderData {
        return { ...params, createdAt: new Date() };
    }

    protected override filterValue(value: ReminderData, { id, chatId }: ReminderFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id') && this.filterFieldValue(value, chatId, 'chatId');
    }
}
