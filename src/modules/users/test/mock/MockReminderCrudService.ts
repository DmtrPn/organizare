import { Singleton } from 'typescript-ioc';
import castArray from 'lodash/castArray';

import { ReminderList } from './ReminderList';
import { IReminderCrudService } from '@users/domain/IReminderCrudService';
import {
    ReminderCreateData,
    ReminderData,
    ReminderFindOptions,
    ReminderUpdateData,
} from '@users/domain/reminder.types';
import { ReminderModel } from '@users/infrastructure/reminder.Model';
import { MockCrudService } from '@core/test/abstract/MockCrudService';

@Singleton
export class MockReminderCrudService
    extends MockCrudService<ReminderData, ReminderCreateData, ReminderUpdateData, ReminderFindOptions>
    implements IReminderCrudService
{
    protected list = new ReminderList();
}
