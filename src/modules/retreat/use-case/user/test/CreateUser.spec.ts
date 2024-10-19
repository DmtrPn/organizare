import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { IUserCrudService } from '@retreat/domain/user/IUserCrudService';
import { expectError } from '@core/test/expectError';
import { AlreadyExistsError } from '@common/domain/errors/AlreadyExistsError';

import { createUser } from '../UserCreateCommand';
import { getFakeUserCreationParams } from './utils/userFakeData';

@Describe()
export class CreateUserSpec {
    @Inject protected crudService!: IUserCrudService;

    @Test('Create user test')
    public async createTest(): Promise<void> {
        const params = getFakeUserCreationParams();
        await createUser(params);

        const user = await this.crudService.getById(params.id);

        expect(user).toEqual(params);
    }

    @expectError(AlreadyExistsError)
    @Test('Cant create user with exist id')
    public async createUserWithExistIdTest(): Promise<void> {
        const params = getFakeUserCreationParams();
        await createUser(params);
        await createUser(params);
    }
}
