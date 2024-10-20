import { Container } from 'typescript-ioc';

import { IUserCrudService } from '../../modules/users/domain/IUserCrudService';
import { UserCrudService } from '../../modules/users/infrastructure/UserCrudService';
import { IRetreatCrudService } from '@retreat/domain/IRetreatCrudService';
import { RetreatCrudService } from '@retreat/infrastructure/RetreatCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { TelegrafService } from '@components/telegraf/TelegrafService';
import { NotificationCrudService } from '../../modules/notification/infrastructure/NotificationCrudService';
import { INotificationCrudService } from '../../modules/notification/domain/INotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(IRetreatCrudService).to(RetreatCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(TelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
