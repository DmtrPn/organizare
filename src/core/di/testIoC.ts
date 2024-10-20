import { Container } from 'typescript-ioc';

import { IUserCrudService } from '../../modules/users/domain/IUserCrudService';
import { UserCrudService } from '../../modules/users/infrastructure/UserCrudService';
import { IRetreatCrudService } from '@retreat/domain/IRetreatCrudService';
import { RetreatCrudService } from '@retreat/infrastructure/RetreatCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { MockTelegrafService } from '@components/telegraf/mock/MockTelegrafService';
import { INotificationCrudService } from '../../modules/notification/domain/INotificationCrudService';
import { NotificationCrudService } from '../../modules/notification/infrastructure/NotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';

Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(IRetreatCrudService).to(RetreatCrudService);
Container.bind(INotificationCrudService).to(NotificationCrudService);
Container.bind(ITelegrafService).to(MockTelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
