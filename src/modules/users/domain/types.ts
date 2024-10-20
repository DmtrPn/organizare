import { BaseFindOptions } from '@common/domain/types';

export interface UserFindOptions extends BaseFindOptions {
    chatId?: number;
}

export interface UserCreateData {
    id: string;
    chatId: number;
    firstName: string;
    lastName: string;
}

export interface UserUpdateData {}
