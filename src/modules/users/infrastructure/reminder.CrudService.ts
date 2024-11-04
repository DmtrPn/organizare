import { Class } from '@project-types/common';

import { IReminderCrudService } from '@users/domain/IReminderCrudService';
import {
    ReminderCreateData,
    ReminderData,
    ReminderFindOptions,
    ReminderUpdateData,
} from '@users/domain/reminder.types';

import { ReminderModel } from './reminder.Model';
import { ReminderFindCommand } from './reminder.FindCommand';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';
import { removeNilKeys } from '@utils/removeNiKeys';

export class ReminderCrudService
    extends IdentityCrudService<ReminderData, ReminderCreateData, ReminderUpdateData, ReminderFindOptions>
    implements IReminderCrudService
{
    protected modelClass = ReminderModel;
    protected findCommand: Class<FindCommand<ReminderData, ReminderFindOptions>, any> = ReminderFindCommand;

    protected enrichCreationParams(params: ReminderCreateData): ReminderModel {
        return new ReminderModel(removeNilKeys({ ...params, createdAt: new Date() }));
    }
}
