import { List } from '@core/test/abstract/List';
import { UserCreateData, UserFindOptions } from '@users/domain/types';
import { UserModel } from '@users/infrastructure/UserModel';

export class UserList extends List<UserModel, UserCreateData, UserFindOptions> {
    protected override create(params: UserCreateData): UserModel {
        return new UserModel(params);
    }

    protected override filterValue(value: UserModel, { id, chatId }: UserFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id') && this.filterFieldValue(value, chatId, 'chatId');
    }
}
