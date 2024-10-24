import { BaseFindOptions } from '@common/domain/types';

export interface UserFindOptions extends BaseFindOptions {
    chatId?: string;
}

export interface UserData {
    id: string;
    chatId: string;
    firstName: string;
    lastName: string;
}

export interface UserCreateData {
    id: string;
    chatId: string;
    firstName: string;
    lastName: string;
}

export interface UserUpdateData {}
