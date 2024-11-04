import type { ReminderData, ReminderFindOptions, ReminderUpdateData, ReminderCreateData } from './reminder.types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IReminderCrudService extends ICrudService<
    ReminderData,
    ReminderCreateData,
    ReminderUpdateData,
    ReminderFindOptions
> {}
