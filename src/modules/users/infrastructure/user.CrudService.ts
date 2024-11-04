import { Class } from '@project-types/common';

import { IUserCrudService } from '../domain/IUserCrudService';
import { UserCreateData, UserData, UserFindOptions, UserUpdateData } from '../domain/user.types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { UserModel } from './user.Model';
import { UserFindCommand } from './user.FindCommand';

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
