import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { UserCrudService } from '@users/infrastructure/user.CrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { TelegrafService } from '@components/telegraf/TelegrafService';
import { NotificationCrudService } from '@notification/infrastructure/notification.CrudService';
import { INotificationCrudService } from '@modules/notification/domain/INotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';
import { UserSceneHandlers } from '@users/applcation/user.SceneHandlers';
import { IReminderCrudService } from '@users/domain/IReminderCrudService';
import { ReminderCrudService } from '@users/infrastructure/reminder.CrudService';
import { IReminderHandlers } from '@bot/interfaces/IReminderHandlers';
import { ReminderSceneHandlers } from '@users/applcation/reminder.SceneHandlers';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { OrganizationCrudService } from '@organization/infrastructure/organization.CrudService';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(TelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
Container.bind(IUserHandlers).to(UserSceneHandlers);
Container.bind(IReminderCrudService).to(ReminderCrudService);
Container.bind(IReminderHandlers).to(ReminderSceneHandlers);
Container.bind(IOrganizationCrudService).to(OrganizationCrudService);
