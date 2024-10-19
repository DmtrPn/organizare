import { RetreatModel } from '@retreat/infrastructure/retreat/RetreatModel';
import { RetreatFindOptions, RetreatUpdateData, RetreatCreateData } from '@retreat/domain/retreat/types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IRetreatCrudService extends ICrudService<
    RetreatModel,
    RetreatCreateData,
    RetreatUpdateData,
    RetreatFindOptions
> {}
