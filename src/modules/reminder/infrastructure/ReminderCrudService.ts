import { Class } from '@project-types/common';

import { IReminderCrudService } from '@reminder/domain/IReminderCrudService';
import { ReminderCreateData, ReminderFindOptions, ReminderUpdateData } from '@reminder/domain/types';

import { ReminderModel } from './ReminderModel';
import { ReminderFindCommand } from './ReminderFindCommand';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';
import { removeNilKeys } from '@utils/removeNiKeys';

export class ReminderCrudService
    extends IdentityCrudService<ReminderModel, ReminderCreateData, ReminderUpdateData, ReminderFindOptions>
    implements IReminderCrudService
{
    protected modelClass = ReminderModel;
    protected findCommand: Class<FindCommand<ReminderModel, ReminderFindOptions>, any> = ReminderFindCommand;

    protected enrichCreationParams(params: ReminderCreateData): ReminderModel {
        return new ReminderModel(removeNilKeys({ ...params, createdAt: new Date() }));
    }
}
