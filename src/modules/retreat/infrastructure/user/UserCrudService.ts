import { Class } from '@project-types/common';

import { IUserCrudService } from '@retreat/domain/user/IUserCrudService';
import { UserCreateData, UserFindOptions, UserUpdateData } from '@retreat/domain/user/types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { UserModel } from './UserModel';
import { UserFindCommand } from './UserFindCommand';

export class UserCrudService
    extends IdentityCrudService<UserModel, UserCreateData, UserUpdateData, UserFindOptions>
    implements IUserCrudService
{
    protected modelClass = UserModel;
    protected findCommand: Class<FindCommand<UserModel, UserFindOptions>, any> = UserFindCommand;

    protected enrichCreationParams(params: UserCreateData): UserModel {
        return new UserModel(params);
    }
}
