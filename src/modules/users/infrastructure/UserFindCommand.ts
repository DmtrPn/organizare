import { UserModel } from './UserModel';
import { UserFindOptions } from '../domain/types';
import { FindIdentifiableCommand } from '@common/infrastructure/FindIdentifiableCommand';

export class UserFindCommand extends FindIdentifiableCommand<UserModel, UserFindOptions> {
    private chatId?: UserFindOptions['chatId'];

    constructor(options: UserFindOptions) {
        super(options, UserModel);
    }

    protected override addFilters(): this {
        return this.filterBy('chatId', this.chatId);
    }
}
