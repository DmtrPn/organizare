import { UserModel } from './user.Model';
import { UserData, UserFindOptions } from '../domain/user.types';
import { FindIdentifiableCommand } from '@common/infrastructure/FindIdentifiableCommand';

export class UserFindCommand extends FindIdentifiableCommand<UserData, UserFindOptions> {
    private chatId?: UserFindOptions['chatId'];

    constructor(options: UserFindOptions) {
        super(options, UserModel);
    }

    protected override addFilters(): this {
        return this.filterBy('chatId', this.chatId);
    }
}
