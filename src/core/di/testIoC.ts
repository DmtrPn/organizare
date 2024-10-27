import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { UserCrudService } from '@users/infrastructure/UserCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { MockTelegrafService } from '@components/telegraf/mock/MockTelegrafService';
import { INotificationCrudService } from '@modules/notification/domain/INotificationCrudService';
import { NotificationCrudService } from '@modules/notification/infrastructure/NotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';
import { IUserHandlers } from '@bot/interfaces/IUserHandlers';
import { UserSceneHandlers } from '@users/applcation/UserSceneHandlers';
import { IReminderCrudService } from '@reminder/domain/IReminderCrudService';
import { ReminderCrudService } from '@reminder/infrastructure/ReminderCrudService';
import { IReminderHandlers } from '@bot/interfaces/IReminderHandlers';
import { ReminderSceneHandlers } from '@reminder/applcation/ReminderSceneHandlers';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(MockTelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
Container.bind(IUserHandlers).to(UserSceneHandlers);
Container.bind(IReminderCrudService).to(ReminderCrudService);
Container.bind(IReminderHandlers).to(ReminderSceneHandlers);
