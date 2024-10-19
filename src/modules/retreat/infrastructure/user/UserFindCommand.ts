import { FindCommand } from '@common/infrastructure/FindCommand';
import { UserModel } from './UserModel';
import { UserFindOptions } from '@retreat/domain/user/types';

export class UserFindCommand extends FindCommand<UserModel, UserFindOptions> {
    private id?: UserFindOptions['id'];
    private chatId?: UserFindOptions['chatId'];

    constructor(options: UserFindOptions) {
        super(options, UserModel);
    }

    protected override addFilters(): this {
        return this.filterBy('id', this.id).filterBy('chatId', this.chatId);
    }
}
