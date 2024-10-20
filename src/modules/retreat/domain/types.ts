import { BaseFindOptions } from '@common/domain/types';

export interface RetreatFindOptions extends BaseFindOptions {
    chatId?: number;
}

export interface RetreatCreateData {
    id: string;
    chatId: number;
    startDate: Date;
}

export interface RetreatUpdateData {
    startDate: Date;
}
