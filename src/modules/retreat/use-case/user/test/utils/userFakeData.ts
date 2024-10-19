import { FakeParams } from '@core/test/FakeParams';
import { UserCreateData, UserUpdateData } from '@retreat/domain/user/types';

export const getFakeUserCreationParams = (params: Partial<UserCreateData> = {}): UserCreateData => {
    return {
        id: FakeParams.getId(),
        chatId: FakeParams.getInteger({ min: 1, max: 100000 }),
        firstName: FakeParams.getName(),
        lastName: FakeParams.getName(),
        ...params,
    };
};

export const getFakeUserUpdateParams = (): UserUpdateData => {
    return {};
};
