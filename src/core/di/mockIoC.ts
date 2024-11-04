import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { MockUserCrudService } from '@users/test/mock/MockUserCrudService';
import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { MockTelegrafService } from '@components/telegraf/mock/MockTelegrafService';
import { MockNotificationCrudService } from '@notification/test/mock/MockNotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';
import { UserSceneHandlers } from '@users/applcation/user.SceneHandlers';
import { IReminderHandlers } from '@bot/interfaces/IReminderHandlers';
import { ReminderSceneHandlers } from '@users/applcation/reminder.SceneHandlers';
import { IReminderCrudService } from '@users/domain/IReminderCrudService';
import { MockReminderCrudService } from '@users/test/mock/MockReminderCrudService';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { MockOrganizationCrudService } from '@organization/test/mock/MockOrganizationCrudService';

Container.bind(IUserCrudService).to(MockUserCrudService);
Container.bind(INotificationCrudService).to(MockNotificationCrudService);
Container.bind(ITelegrafService).to(MockTelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
Container.bind(IUserHandlers).to(UserSceneHandlers);
Container.bind(IReminderHandlers).to(ReminderSceneHandlers);
Container.bind(IReminderCrudService).to(MockReminderCrudService);
Container.bind(IOrganizationCrudService).to(MockOrganizationCrudService);
