import { Singleton } from 'typescript-ioc';

import type { IUserCrudService } from '@users/domain/IUserCrudService';
import { UserCreateData, UserData, UserFindOptions, UserUpdateData } from '@users/domain/user.types';

import { UserList } from './UserList';
import { MockCrudService } from '@core/test/abstract/MockCrudService';

@Singleton
export class MockUserCrudService
    extends MockCrudService<UserData, UserCreateData, UserUpdateData, UserFindOptions>
    implements IUserCrudService
{
    protected list = new UserList();
}
