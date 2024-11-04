import { List } from '@core/test/abstract/List';
import { ReminderModel } from '@reminder/infrastructure/ReminderModel';
import { ReminderCreateData, ReminderFindOptions } from '@reminder/domain/types';

export class ReminderList extends List<ReminderModel, ReminderCreateData, ReminderFindOptions> {
    protected override create(params: ReminderCreateData): ReminderModel {
        return new ReminderModel({ ...params, createdAt: new Date() });
    }

    protected override filterValue(value: ReminderModel, { id, chatId }: ReminderFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id') && this.filterFieldValue(value, chatId, 'chatId');
    }
}
