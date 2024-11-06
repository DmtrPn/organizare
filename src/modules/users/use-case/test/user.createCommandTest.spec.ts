import { Inject } from 'typescript-ioc';

import { Describe, Test } from '@core/test/decorators/testDecorators';
import { expect } from '@core/test/expect';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { expectError } from '@core/test/expectError';
import { AlreadyExistsError } from '@common/domain/errors/AlreadyExistsError';

import { createUser } from '../user.CreateCommand';
import { getFakeUserCreationParams } from '@users//test/utils/userFakeData';
import { IntegrationTest } from '@core/test/IntegrationTest';

@Describe()
export class UserCreateCommandTestSpec extends IntegrationTest {
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
