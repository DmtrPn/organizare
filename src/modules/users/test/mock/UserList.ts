import { List } from '@core/test/abstract/List';
import { UserCreateData, UserData, UserFindOptions } from '@users/domain/user.types';

export class UserList extends List<UserData, UserCreateData, UserFindOptions> {
    protected override filterValue(value: UserData, { id, chatId }: UserFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id') && this.filterFieldValue(value, chatId, 'chatId');
    }
}
