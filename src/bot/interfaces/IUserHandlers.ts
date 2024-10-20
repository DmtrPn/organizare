import { UserCreateParams } from '@users/use-case/UserCreateCommand';

export abstract class IUserHandlers {
    public abstract create(params: UserCreateParams): Promise<void>;
}
