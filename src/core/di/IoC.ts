import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@retreat/domain/user/IUserCrudService';
import { UserCrudService } from '@retreat/infrastructure/user/UserCrudService';
import { IRetreatCrudService } from '@retreat/domain/retreat/IRetreatCrudService';
import { RetreatCrudService } from '@retreat/infrastructure/retreat/RetreatCrudService';
import { ITelegrafService } from '@retreat/domain/telegraf/ITelegrafService';
import { TelegrafService } from '@retreat/infrastructure/telegraf/TelegrafService';
import { NotificationCrudService } from '@retreat/infrastructure/notification/NotificationCrudService';
import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(IRetreatCrudService).to(RetreatCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(TelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
