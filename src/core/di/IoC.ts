import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { UserCrudService } from '@users/infrastructure/UserCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { TelegrafService } from '@components/telegraf/TelegrafService';
import { NotificationCrudService } from '@modules/notification/infrastructure/NotificationCrudService';
import { INotificationCrudService } from '@modules/notification/domain/INotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';
import { UserSceneHandlers } from '@users/applcation/UserSceneHandlers';
import { IReminderCrudService } from '@reminder/domain/IReminderCrudService';
import { ReminderCrudService } from '@reminder/infrastructure/ReminderCrudService';
import { IReminderHandlers } from '@bot/interfaces/IReminderHandlers';
import { ReminderSceneHandlers } from '@reminder/applcation/ReminderSceneHandlers';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { OrganizationCrudService } from '@organization/infrastructure/OrganizationCrudService';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(TelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
Container.bind(IUserHandlers).to(UserSceneHandlers);
Container.bind(IReminderCrudService).to(ReminderCrudService);
Container.bind(IReminderHandlers).to(ReminderSceneHandlers);
Container.bind(IOrganizationCrudService).to(OrganizationCrudService);
