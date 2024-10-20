import { RetreatModel } from '@retreat/infrastructure/RetreatModel';
import { RetreatFindOptions, RetreatUpdateData, RetreatCreateData } from '@retreat/domain/types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IRetreatCrudService extends ICrudService<
    RetreatModel,
    RetreatCreateData,
    RetreatUpdateData,
    RetreatFindOptions
> {}
