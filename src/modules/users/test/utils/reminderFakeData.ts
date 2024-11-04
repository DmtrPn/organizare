import { FakeParams } from '@core/test/FakeParams';
import { ReminderCreateData, ReminderUpdateData } from '@users/domain/reminder.types';

export const getFakeReminderCreationParams = (params: Partial<ReminderCreateData> = {}): ReminderCreateData => {
    return {
        id: FakeParams.getId(),
        title: FakeParams.getText(),
        description: FakeParams.getText(),
        date: FakeParams.getDate(),
        chatId: FakeParams.getId(),
        ...params,
    };
};

export const getFakeReminderUpdateParams = (params: Partial<ReminderUpdateData> = {}): ReminderUpdateData => {
    return {
        title: FakeParams.getText(),
        description: FakeParams.getText(),
        date: FakeParams.getDate(),
        ...params,
    };
};
