import { FakeParams } from '@core/test/FakeParams';
import { RetreatCreateData, RetreatUpdateData } from '@retreat/domain/retreat/types';

export const getFakeRetreatCreationParams = (params: Partial<RetreatCreateData> = {}): RetreatCreateData => {
    return {
        id: FakeParams.getId(),
        chatId: FakeParams.getInteger(),
        startDate: FakeParams.getDate(),
        ...params,
    };
};

export const getFakeRetreatUpdateParams = (params: Partial<RetreatUpdateData> = {}): RetreatUpdateData => {
    return {
        startDate: FakeParams.getDate(),
        ...params,
    };
};
