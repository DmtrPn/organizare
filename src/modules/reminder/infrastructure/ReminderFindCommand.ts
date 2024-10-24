import { ReminderModel } from './ReminderModel';
import { ReminderFindOptions } from '@reminder/domain/types';
import { FindIdentifiableCommand } from '@common/infrastructure/FindIdentifiableCommand';

export class ReminderFindCommand extends FindIdentifiableCommand<ReminderModel, ReminderFindOptions> {
    private chatId: ReminderFindOptions['chatId'];

    constructor(options: ReminderFindOptions) {
        super(options, ReminderModel);
    }

    protected override addFilters(): this {
        return this.filterBy('chatId', this.chatId);
    }
}
