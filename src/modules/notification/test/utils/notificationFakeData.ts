import { FakeParams } from '@core/test/FakeParams';
import { NotificationCreateData, NotificationEntityType } from '@notification/domain/notification.types';

export const getFakeNotificationCreationParams = (
    params: Partial<NotificationCreateData> = {},
): NotificationCreateData => {
    return {
        id: FakeParams.getId(),
        chatId: FakeParams.getId(),
        entityId: FakeParams.getId(),
        entityType: NotificationEntityType.Reminder,
        executeAt: FakeParams.getDate(),
        message: FakeParams.getText(),
        ...params,
    };
};
