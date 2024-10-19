import { UserModel } from '@retreat/infrastructure/user/UserModel';
import { UserFindOptions, UserUpdateData, UserCreateData } from '@retreat/domain/user/types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IUserCrudService extends ICrudService<
    UserModel,
    UserCreateData,
    UserUpdateData,
    UserFindOptions
> {}
