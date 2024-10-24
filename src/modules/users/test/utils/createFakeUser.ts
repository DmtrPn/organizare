import { UserCreateData } from '@users/domain/types';

import { getFakeUserCreationParams } from './userFakeData';
import { createUser } from '@users/use-case/UserCreateCommand';

export async function createFakeUser(params: Partial<UserCreateData> = {}): Promise<UserCreateData> {
    const user = getFakeUserCreationParams(params);
    await createUser(user);
    return user;
}
