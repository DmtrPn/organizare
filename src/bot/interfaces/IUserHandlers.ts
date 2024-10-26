import { UserCreateParams } from '@users/use-case/UserCreateCommand';

export interface UserCreateData {
    id: string;
    chatId: string;
    firstName: string;
    lastName: string;
}

export abstract class IUserHandlers {
    public abstract createIfNotExist(params: UserCreateParams): Promise<void>;
}
