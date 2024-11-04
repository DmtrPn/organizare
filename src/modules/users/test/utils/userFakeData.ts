import { FakeParams } from '@core/test/FakeParams';
import { UserCreateData, UserUpdateData } from '@users/domain/user.types';

export const getFakeUserCreationParams = (params: Partial<UserCreateData> = {}): UserCreateData => {
    return {
        id: FakeParams.getId(),
        chatId: FakeParams.getId(),
        firstName: FakeParams.getName(),
        lastName: FakeParams.getName(),
        ...params,
    };
};

export const getFakeUserUpdateParams = (): UserUpdateData => {
    return {};
};
