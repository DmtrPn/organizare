import { Class } from '@project-types/common';

import { IUserCrudService } from '../domain/IUserCrudService';
import { UserCreateData, UserData, UserFindOptions, UserUpdateData } from '../domain/types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { UserModel } from './UserModel';
import { UserFindCommand } from './UserFindCommand';

export class UserCrudService
    extends IdentityCrudService<UserData, UserCreateData, UserUpdateData, UserFindOptions>
    implements IUserCrudService
{
    protected modelClass = UserModel;
    protected findCommand: Class<FindCommand<UserData, UserFindOptions>, any> = UserFindCommand;

    protected enrichCreationParams(params: UserCreateData): UserModel {
        return new UserModel(params);
    }
}
