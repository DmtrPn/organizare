import { UserModel } from '../infrastructure/UserModel';
import { UserFindOptions, UserUpdateData, UserCreateData } from './types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IUserCrudService extends ICrudService<
    UserModel,
    UserCreateData,
    UserUpdateData,
    UserFindOptions
> {}
