import { UserCreateData } from '@users/domain/user.types';

import { getFakeUserCreationParams } from './userFakeData';
import { createUser } from '@users/use-case/user.CreateCommand';

export async function createFakeUser(params: Partial<UserCreateData> = {}): Promise<UserCreateData> {
    const user = getFakeUserCreationParams(params);
    await createUser(user);
    return user;
}
