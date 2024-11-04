import { ReminderModel } from './reminder.Model';
import { ReminderData, ReminderFindOptions } from '@users/domain/reminder.types';
import { FindIdentifiableCommand } from '@common/infrastructure/FindIdentifiableCommand';

export class ReminderFindCommand extends FindIdentifiableCommand<ReminderData, ReminderFindOptions> {
    private chatId: ReminderFindOptions['chatId'];

    constructor(options: ReminderFindOptions) {
        super(options, ReminderModel);
    }

    protected override addFilters(): this {
        return this.filterBy('chatId', this.chatId);
    }
}
