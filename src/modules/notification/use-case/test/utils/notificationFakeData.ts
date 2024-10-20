import { FakeParams } from '@core/test/FakeParams';
import { NotificationCreateData } from '@notification/domain/types';

export const getFakeNotificationCreationParams = (
    params: Partial<NotificationCreateData> = {},
): NotificationCreateData => {
    return {
        id: FakeParams.getId(),
        chatId: FakeParams.getInteger(),
        retreatId: FakeParams.getId(),
        executeAt: FakeParams.getDate(),
        message: FakeParams.getText(),
        ...params,
    };
};
