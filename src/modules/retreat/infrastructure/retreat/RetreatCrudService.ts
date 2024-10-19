import { Class } from '@project-types/common';

import { IRetreatCrudService } from '@retreat/domain/retreat/IRetreatCrudService';
import { RetreatCreateData, RetreatFindOptions, RetreatUpdateData } from '@retreat/domain/retreat/types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { RetreatModel } from './RetreatModel';
import { RetreatFindCommand } from './RetreatFindCommand';

export class RetreatCrudService
    extends IdentityCrudService<RetreatModel, RetreatCreateData, RetreatUpdateData, RetreatFindOptions>
    implements IRetreatCrudService
{
    protected modelClass = RetreatModel;
    protected findCommand: Class<FindCommand<RetreatModel, RetreatFindOptions>, any> = RetreatFindCommand;

    protected enrichCreationParams(params: RetreatCreateData): RetreatModel {
        return new RetreatModel(params);
    }
}
