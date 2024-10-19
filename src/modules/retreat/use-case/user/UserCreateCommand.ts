import { UserCreateData } from '@retreat/domain/user/types';
import { AlreadyExistsError } from '@components/common/domain/errors/AlreadyExistsError';

import { UserCommand } from './UserCommand';

interface Params extends UserCreateData {
    ifNotExist?: boolean;
}

export class UserCreateCommand extends UserCommand<Params> {
    public async execute(): Promise<void> {
        const { ifNotExist, ...params } = this.params;
        const [user] = await this.crudService.find({ chatId: params.chatId });

        if (!user) {
            await this.crudService.create(params);
        } else if (!ifNotExist) {
            throw new AlreadyExistsError({ entityName: 'User', id: params.id });
        }
    }
}

export const createUser = (params: Params) => new UserCreateCommand(params).execute();
