import { createUser, UserCreateParams } from '@users/use-case/UserCreateCommand';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';

export class UserSceneHandlers implements IUserHandlers {
    public async create(params: UserCreateParams): Promise<void> {
        await createUser(params);
    }
}
