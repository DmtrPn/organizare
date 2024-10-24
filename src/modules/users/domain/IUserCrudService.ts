import { UserFindOptions, UserUpdateData, UserCreateData, UserData } from './types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IUserCrudService extends ICrudService<
    UserData,
    UserCreateData,
    UserUpdateData,
    UserFindOptions
> {}
