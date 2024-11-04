import { BaseFindOptions } from '@common/domain/types';

export interface OrganizationUserData {
    id: string;
    chatId: string;
}

export interface OrganizationData {
    id: string;
    name: string;
}

export interface OrganizationCreateData {
    id: string;
    name: string;
}

export interface OrganizationUpdateData {}

export interface OrganizationFindOptions extends BaseFindOptions {}
