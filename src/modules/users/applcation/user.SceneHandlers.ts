import { createUser, UserCreateParams } from '@users/use-case/user.CreateCommand';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';

export class UserSceneHandlers implements IUserHandlers {
    public async createIfNotExist(params: UserCreateParams): Promise<void> {
        await createUser({ ...params, ifNotExist: true });
    }
}
